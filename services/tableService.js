const Table = require("../model/Table");
const { v4: uuidv4 } = require("uuid");

// async function addTable(type, tableCount, rid) {
//   try {
//     const tables = Array.from({ length: tableCount }, () => ({
//       tableId: uuidv4(),
//       status: 0,
//     }));

//     const newTable = new Table({
//       type,
//       tableCount,
//       rid,
//       tables,
//     });

//     const savedTable = await newTable.save();
//     return savedTable;
//   } catch (error) {
//     throw error;
//   }
// }

async function addTable(type, tableCount, rid) {
  try {
    // Проверяем, существует ли запись с указанным типом стола и id заведения
    const existingTable = await Table.findOne({ type, rid });

    if (existingTable) {
      // Если запись уже существует, добавляем указанное количество столов к существующему количеству
      existingTable.tableCount += tableCount;

      // Генерируем новые tableId и добавляем их к существующим столам
      const newTables = Array.from({ length: tableCount }, () => ({
        tableId: uuidv4(),
        status: 0,
      }));
      existingTable.tables = existingTable.tables.concat(newTables);

      // Сохраняем обновленную запись
      const savedTable = await existingTable.save();
      return savedTable;
    } else {
      // Если запись с указанным типом стола и id заведения не существует, создаем новую запись
      const tables = Array.from({ length: tableCount }, () => ({
        tableId: uuidv4(),
        status: 0,
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
      throw new Error("Необходимо указать либо tableId, либо tid");
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
      throw new Error("Стол не найден");
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
