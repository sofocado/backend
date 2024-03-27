const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const tableSchema = new mongoose.Schema({
  tid: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  tableCount: {
    type: Number,
    required: true,
  },
  tables: [
    {
      tableId: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true,
      },
      status: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;
