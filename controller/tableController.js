const tableService = require("../services/tableService");

async function addTable(req, res) {
  try {
    const table = await tableService.addTable(req.body);
    res.status(200).json(table);
  } catch (error) {
    res.status(400).json({ result_msg: error.message });
  }
}

async function listTables(req, res) {
  try {
    const { rid } = req.body;
    const tables = await tableService.listTables({ rid });
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

async function deleteTable(req, res) {
  try {
    await tableService.deleteTable(req.body.tableId);
    res.status(200).json({ result_msg: "Стол успешно удален" });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

module.exports = {
  addTable,
  listTables,
  deleteTable,
};
