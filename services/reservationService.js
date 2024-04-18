const Reservation = require("../model/Reservation");
const Table = require("../model/Table")

async function addReservation(data) {
  try {
    const { tid, reservationStartTime } = data;
    const reservationDuration = 5400; // Время бронирования в секундах
    const reservationEndTime = reservationStartTime + reservationDuration;

    // Проверка наличия столов данного типа
    const table = await Table.findOne({ tid: tid });
    if (!table) {
      throw new Error("Нет столов этого типа");
    }

    // Получение всех бронирований для данного типа стола
    const reservations = await Reservation.find({ tid: tid, resStatus: 1 });

    // Фильтрация свободных столов
    const availableTables = table.tables.filter((t) => {
      const isBooked = reservations.some((res) => {
        return (
          res.tableId === t.tableId &&
          ((reservationStartTime < res.reservationEndTime &&
            reservationStartTime >= res.reservationStartTime) ||
            (reservationEndTime > res.reservationStartTime &&
              reservationEndTime <= res.reservationEndTime))
        );
      });
      return t.status === 0 && !isBooked;
    });

    if (availableTables.length === 0) {
      throw new Error("Нет доступных столов");
    }

    // Выбор случайного свободного стола
    const availableTable =
      availableTables[Math.floor(Math.random() * availableTables.length)];

    // Добавление бронирования
    const newReservation = new Reservation({
      ...data,
      tableId: availableTable.tableId,
      reservationEndTime,
      resStatus: 0, // Статус бронирования устанавливается в 1, означая подтвержденное бронирование
    });

    const savedReservation = await newReservation.save();

    return {
      result_code: 0,
      result_msg: "Success!",
      data: savedReservation,
    };
  } catch (error) {
    throw error;
  }
}

async function listReservations(uid, rid) {
  try {
    let query = {}; 

    if (uid !== null && uid !== "") {
      query.uid = uid
    }

    if (rid !== null && rid !== "") {
      query.rid = rid;
    }
    const reservations = await Reservation.find( query );
    return {
      result_code: 0,
      result_msg: "Success!",
      data: {
        recordcount: reservations.length,
        rows: reservations,
      },
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
