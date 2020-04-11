const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String },
  link: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  adzunaId: { type: String, required: true, unique: true }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;