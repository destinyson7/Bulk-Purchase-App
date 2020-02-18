const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5
    },

    password: {
      type: String,
      required: true
    },

    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      trim: true
    },

    type: {
      type: String,
      required: true,
      trim: true
    }
  },

  {
    collection: "users"
  }
);

module.exports = mongoose.model("User", UserSchema);
