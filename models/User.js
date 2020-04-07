const mongoose = require("mongoose");
require("mongoose-type-email");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 12
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 12
  },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  },
  contactInfo: {
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true
    },
    phoneNum: {
      type: String,
      validate: {
        validator: function(v) {
          return;
        }
      },
      required: true
    }
  },
  workExperience: [
    {
      jobTitle: String,
      companyName: String,
      startDate: { type: Date, required: true },
      endDate: { type: Date, default: "Current Job" }
    }
  ],
  savedJobs: [{ jobId }]
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
