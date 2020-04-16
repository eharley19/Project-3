const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const PORT = process.env.PORT || 6000;
const cors = require('cors');
const app = express();

app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


if (process.env.NODE_ENV === "production") {
  app.use(express.static("job-search-site/build"));
}


app.use(routes);


mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/job-search",
  {
   useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});