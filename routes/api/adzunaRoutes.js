const router = require("express").Router();
const jobdbController = require("../../controllers/adzunaController");


router.route("/").get(jobdbController.findAll);

module.exports = router;
