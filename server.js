const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const multer = require("multer");
const app = express();
const path = require("path");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "job-search-site/build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "job-search-site/build", "index.html"));
  });
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/job-search", {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

// save uploaded files

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "job-search-site/public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

app.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});
