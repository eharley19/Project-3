const path = require("path");
const router = require("express").Router();
const jobsRoutes = require("./jobs");
const adzunaRoutes = require("./adzuna");


router.use("/saved-jobs", jobsRoutes);


router.use("/search-jobs", adzunaRoutes);


router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../job-search-site/public/index.html"));
});

module.exports = router;