const tableService = require("../services/tableService");

async function addTable(req, res) {
  try {
    const { type, tableCount, rid } = req.body;
    const savedTable = await tableService.addTable(type, tableCount, rid);
    res
      .status(200)
      .json({ result_code: 0, result_msg: "Success!", data: savedTable });
  } catch (error) {
    res.status(400).json({ result_msg: error.message });
  }
}

async function listTables(req, res) {
  try {
    const { rid } = req.body;
    const tables = await tableService.listTables(rid);
    res
      .status(200)
      .json({ result_code: 0, result_msg: "Success!", data: { recordcount: tables.length, rows: tables } });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

async function deleteTable(req, res) {
  try {
    const { tableId, tid } = req.body;
    await tableService.deleteTable({ tableId, tid });
    res.status(200).json({ result_code: 0, result_msg: "Success!" });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

module.exports = {
  addTable,
  listTables,
  deleteTable,
};
