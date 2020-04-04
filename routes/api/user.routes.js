const router = require("express").Router();
const controllers = require("../../controllers/user.controllers");

router
  .route("/")
  .get(controllers.getAll)
  .post(controllers.create);

router
  .route("/:id")
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

module.exports = router;
