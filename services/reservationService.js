const Reservation = require("../model/Reservation");
const Table = require("../model/Table")

async function addReservation(data) {
  try {
    const { tid, reservationStartTime } = data;
    const reservationDuration = 5940; // 1:45 min
    const reservationEndTime = reservationStartTime + reservationDuration;

    const table = await Table.findOne({ tid: tid });
    if (!table) {
      throw new Error("Нет столов этого типа");
    }

    const reservations = await Reservation.find({ tid: tid, resStatus: 1 });

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

    const availableTable =
      availableTables[Math.floor(Math.random() * availableTables.length)];

    const newReservation = new Reservation({
      ...data,
      tableId: availableTable.tableId,
      reservationEndTime,
      resStatus: 0, 
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

async function listReservations(uid, rid, sort) {
  try {
    let query = {};

    if (uid !== null && uid !== "") {
      query.uid = uid;
    }

    if (rid !== null && rid !== "") {
      query.rid = rid;
    }

    const sortOptions = {};
    sort.forEach((sortObj) => {
      sortOptions[sortObj.key] = sortObj.isAsc === 0 ? 1 : -1;
    });

    const reservations = await Reservation.find(query).sort(sortOptions);
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
