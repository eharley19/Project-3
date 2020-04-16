const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: { type: String },
  location: { type: String },
  contract_time: { type: String },
  link: { type: String },
  description: { type: String },
  company: { type: String },
  adzunaId: { type: String, required: true },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
