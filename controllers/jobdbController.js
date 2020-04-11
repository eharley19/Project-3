const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    db.Job.find(req.query)
      .then((dbJob) => res.json(dbJob))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Job.findById(req.params.id)
      .then((dbJob) => res.json(dbJob))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Job.create(req.body)
      .then((dbJob) => res.json(dbJob))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Job.findOneAndUpdate({ id: req.params.id }, req.body)
      .then((dbJob) => res.json(dbJob))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Job.findById(req.params.id)
      .then((dbJob) => dbJob.remove())
      .then((dbJob) => res.json(dbJob))
      .catch((err) => res.status(422).json(err));
  },
};
