const router = require("express").Router();
const adzunaController = require("../../controllers/adzunaController");

router.route("/").get(adzunaController.findAll);

module.exports = router;
