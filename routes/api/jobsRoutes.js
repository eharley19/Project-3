const router = require("express").Router();
const jobdbController = require("../../controllers/jobdbController");
const auth = require("./auth");

router
  .route("/", auth)
  .get(jobdbController.findAll)
  .post(jobdbController.create);

router
  .route("/:id", auth)
  .get(jobdbController.findById)
  .put(jobdbController.update)
  .delete(jobdbController.remove);

module.exports = router;
