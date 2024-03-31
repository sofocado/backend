const cron = require("node-cron");
const Table = require("../model/Table");

async function updateTableStatus() {
  const currentTime = Date.now() / 1000;

  const reservations = await Reservation.find({ resStatus: 1 });
  reservations.forEach(async (reservation) => {
    if (reservation.reservationEndTime < currentTime) {
      reservation.resStatus = 0;
      await reservation.save();

      const table = await Table.findOne({
        "tables.tableId": reservation.tableId,
      });
      if (table) {
        const tableToUpdate = table.tables.find(
          (t) => t.tableId === reservation.tableId
        );
        if (tableToUpdate) {
          tableToUpdate.status = 0;
          await table.save();
        }
      }
    }
  });
}

function tableStatusUpdater() {
  cron.schedule("* * * * *", async () => {
    console.log("Проверка и обновление статуса столов и бронирований...");
    await updateTableStatus();
  });
}

module.exports = tableStatusUpdater;
