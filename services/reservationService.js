const Reservation = require("../model/Reservation");
const Table = require("../model/Table");

async function addReservation(data) {
  try {
    const { tid, reservationStartTime } = data;
    const reservationDuration = 5400; 
    const reservationEndTime = reservationStartTime + reservationDuration;

    const table = await Table.findOne({ tid: tid });
    if (!table) {
      throw new Error("There are no such tables");
    }

    const reservations = await Reservation.find({ tid: tid });
    const bookedTables = reservations.filter((res) => {
      return (
        res.resStatus === 0 && 
        reservationStartTime < res.reservationEndTime &&
        reservationEndTime > res.reservationStartTime
      );
    });

    const availableTables = table.tables.filter((t) => {
      return !bookedTables.some((res) => res.tableId === t.tableId);
    });

    if (availableTables.length === 0) {
      throw new Error("There are no tables available");
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