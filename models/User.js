const mongoose = require("mongoose");
require("mongoose-type-email");


const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 12,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 12,
  },
  name: { type: String, required: true },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
  phoneNum: {
    type: String,
    validate: {
      validator: function (v) {
        return phoneRegExp.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true,
  },

  // savedJobs: [{ jobId }]
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
