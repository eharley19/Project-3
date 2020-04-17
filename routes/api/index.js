const path = require("path");
const router = require("express").Router();

const userRoutes = require("./userRoutes");
const jobsRoutes = require("./jobsRoutes");
const adzunaRoutes = require("./adzunaRoutes");
const auth = require("./auth");

router.use("/users", userRoutes);
router.use("/jobs", auth, jobsRoutes);
router.use("/adzuna", adzunaRoutes);

module.exports = router;
