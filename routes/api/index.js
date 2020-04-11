const path = require("path");
const router = require("express").Router();

const userRoutes = require("./userRoutes");
const jobsRoutes = require("./jobsRoutes");
const adzunaRoutes = require("./adzunaRoutes");

router.use("/users", userRoutes);
router.use("/jobs", jobsRoutes);
router.use("/adzuna", adzunaRoutes);

module.exports = router;
