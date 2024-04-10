const Table = require("../model/Table");
const { v4: uuidv4 } = require("uuid");

async function addTable(data) {
  try {
    const { type, tableCount, rid } = data; 
    const tables = Array.from({ length: tableCount }, () => ({
      tableId: uuidv4(),
      status: 0,
    }));

    const newTable = {
      type,
      tableCount,
      rid,
      tables,
    };

    const savedTable = await new Table(newTable).save();
    return {
      result_code: 0,
      result_msg: "Success!",
      data: savedTable,
    };
  } catch (error) {
    throw error;
  }
}

async function listTables(tableData) {
  try {
    const { rid } = tableData;
    const tables = await Table.find({ rid });
    return {
      result_code: 0,
      result_msg: "Success!",
      data: tables,
    };
  } catch (error) {
    throw error;
  }
}

async function deleteTable(tableId) {
  try {
    const tableDoc = await Table.findOne({ "tables.tableId": tableId });
    if (!tableDoc) {
      throw new Error("Стол не найден");
    }
    tableDoc.tables = tableDoc.tables.filter((t) => t.tableId !== tableId);
    tableDoc.tableCount = tableDoc.tables.length;
    await tableDoc.save();

    return { result_msg: "Success!" };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addTable,
  listTables,
  deleteTable,
};
