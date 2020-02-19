const mongoose = require("mongoose");

let OrderSchema = new mongoose.Schema(
  {
    customerID: {
      type: String,
      required: true,
      trim: true
    },

    productID: {
      type: String,
      required: true,
      trim: true
    },

    quantity: {
      type: Number,
      required: true,
      trim: true
    },

    isReviewed: {
      type: Boolean,
      default: false
    },

    productRating: {
      type: Number
    },

    vendorRating: {
      type: Number
    },

    productReview: {
      type: String
    },

    vendorReview: {
      type: String
    }
  },

  {
    collection: "orders"
  }
);

module.exports = mongoose.model("Order", OrderSchema);
