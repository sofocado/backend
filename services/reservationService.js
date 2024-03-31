const Reservation = require("../model/Reservation");
const Table = require("../model/Table")

async function addReservation(data) {
  try {
    const { tid, ...reservationData } = data;
    const table = await Table.findOne({ tid: tid, "tables.status": 0 });
    if (!table) {
      throw new Error("Нет доступных столов этого типа");
    }
    const availableTable = table.tables.find((t) => t.status === 0);
    const reservationEndTime = reservationData.reservationStartTime + 3 * 60; // Установите правильное значение для длительности бронирования

    // Создание нового бронирования с resStatus = 1
    const newReservation = new Reservation({
      ...reservationData,
      tid,
      tableId: availableTable.tableId,
      reservationEndTime,
      resStatus: 1, // Устанавливаем статус бронирования в 1
    });

    const savedReservation = await newReservation.save();

    // Обновление статуса стола на забронированный (1)
    availableTable.status = 1;
    await table.save();

    return {
      result_code: 0,
      result_msg: "Success!",
      data: savedReservation,
    };
  } catch (error) {
    throw error;
  }
}


async function listReservations(uid) {
  try {
    const reservations = await Reservation.find({ uid: uid });
    return {
      result_code: 0,
      result_msg: "Success!",
      data: reservations,
    };
  } catch (error) {
    throw error;
  }
}

async function deleteReservation(reservationId) {
  try {
    const reservation = await Reservation.findOneAndDelete({
      reservationId: reservationId,
    });
    if (reservation) {
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
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addReservation,
  listReservations,
  deleteReservation,
};
