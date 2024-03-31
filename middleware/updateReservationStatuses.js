const cron = require("node-cron");
const Reservation = require("../model/Reservation");
const Table = require("../model/Table");

const updateReservationStatuses = async () => {
  const currentTimestamp = Date.now();

  // Update reservations that have ended
  const endedReservations = await Reservation.find({
    reservationEndTime: { $lt: currentTimestamp },
    resStatus: 1,
  });

  for (const reservation of endedReservations) {
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

  // Update reservations that have started but not yet ended
  const activeReservations = await Reservation.find({
    reservationStartTime: { $lte: currentTimestamp },
    reservationEndTime: { $gt: currentTimestamp },
    resStatus: 0,
  });

  for (const reservation of activeReservations) {
    reservation.resStatus = 1;
    await reservation.save();

    const table = await Table.findOne({
      "tables.tableId": reservation.tableId,
    });
    if (table) {
      const tableToUpdate = table.tables.find(
        (t) => t.tableId === reservation.tableId
      );
      if (tableToUpdate) {
        tableToUpdate.status = 1;
        await table.save();
      }
    }
  }
};

const startCronJob = () => {
  cron.schedule("*/3 * * * *", async () => {
    console.log("Checking and updating reservation and table statuses...");
    await updateReservationStatuses();
  });
};

module.exports = startCronJob;
