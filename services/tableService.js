const Table = require("../model/Table");
const { v4: uuidv4 } = require("uuid");

async function addTable(type, tableCount, rid) {
  try {
    const existingTable = await Table.findOne({ type, rid });

    if (existingTable) {
      existingTable.tableCount += tableCount;

      const newTables = Array.from({ length: tableCount }, () => ({
        tableId: uuidv4(),
        status: 0,
        tableCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
      }));
      existingTable.tables = existingTable.tables.concat(newTables);

      const savedTable = await existingTable.save();
      return savedTable;
    } else {
      const tables = Array.from({ length: tableCount }, () => ({
        tableId: uuidv4(),
        status: 0,
        tableCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
      }));

      const newTable = new Table({
        type,
        tableCount,
        rid,
        tables,
      });

      const savedTable = await newTable.save();
      return savedTable;
    }
  } catch (error) {
    throw error;
  }
}

async function listTables(rid) {
  try {
    const tables = await Table.find({ rid });
    return tables;
  } catch (error) {
    throw error;
  }
}

async function deleteTable({ tableId, tid }) {
  try {
    if (!tableId && !tid) {
      throw new Error("Either tableId or tid must be specified");
    }

    let query = {};

    if (tableId && tid) {
      query = { $or: [{ "tables.tableId": tableId }, { tid }] };
    } else if (tableId) {
      query = { "tables.tableId": tableId };
    } else if (tid) {
      query = { tid };
    }

    const tableDoc = await Table.findOne(query);

    if (!tableDoc) {
      throw new Error("Table not found");
    }

    if (tableId && !tid) {
      tableDoc.tables = tableDoc.tables.filter((t) => t.tableId !== tableId);
      tableDoc.tableCount = tableDoc.tables.length;
      await tableDoc.save();
    } else {
      await Table.findOneAndDelete(query);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addTable,
  listTables,
  deleteTable,
};
