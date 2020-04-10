const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String },
  contract_time: { type: [String], required: true },
  link: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  adzunaId: { type: String, required: true, unique: true }
});

const Job = mongoose.model("Job", bookSchema);

module.exports = Book;