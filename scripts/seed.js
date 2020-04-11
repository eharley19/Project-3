const mongoose = require("mongoose");
const Job = require("../models/job");

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/job-search", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  family: 4, // Use IPv4, skip trying IPv6
});
const jobsSeed = [
  {
    adzunaId: "GfMSW5w3NTwC",
    title: "The Twilight Saga",
    Location: "New York City",
    link: "https://indeed.com",
    description: "Sample job here",
  },
];

async function seed() {
  await mongoose
    .connect(MONGODB_URI, options)
    .then(() => {
      console.log("Seed: Connected to Database");
    })
    .catch((err) => {
      console.log("Seed: Not Connected to Database ERROR! ", err);
    });
  for (let job of jobsSeed) {
    const { _id: bookId } = await new Job({
      title: job.title,
      location: job.location,
      contract_time: job.contract_time,
      link: job.link,
      description: job.description,
      adzunaId: job.adzunaId,
    }).save();
  }

  mongoose.disconnect();

  console.info("Seed: Done!");
}

seed();
