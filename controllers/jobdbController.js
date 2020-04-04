const db = require("../models");


module.exports = {
  findAll: function(req, res) {
    db.Jobs.find(req.query)
      .then(dbJobs => res.json(dbJobs))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Jobs.findById(req.params.id)
      .then(dbJobs => res.json(dbJobs))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Jobs.create(req.body)
      .then(dbJobs => res.json(dbJobs))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Jobs.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbJobs => res.json(dbJobs))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Jobs.findById(req.params.id)
      .then(dbJobs => dbJobs.remove())
      .then(dbJobs => res.json(dbJobs))
      .catch(err => res.status(422).json(err));
  }
};