const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todosSchema = new Schema({
    id: String,
    name: String,
    email: String,
    text: String,
    edit: Boolean,
    status: Boolean,
  });
  
  module.exports = mongoose.model("todo", todosSchema);