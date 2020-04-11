const router = require("express").Router();
const jobdbController = require("../../controllers/jobdbController");

router.route("/").get(jobdbController.findAll).post(jobdbController.create);

router
  .route("/:id")
  .get(jobdbController.findById)
  .put(jobdbController.update)
  .delete(jobdbController.remove);

module.exports = router;
