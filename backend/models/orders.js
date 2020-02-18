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

    sellerID: {
      type: String,
      required: true,
      trim: true
    },

    isCancelled: {
      type: Boolean,
      default: false,
      trim: true
    },

    isReady: {
      type: Boolean,
      default: false,
      trim: true
    },

    hasDispatched: {
      type: Boolean,
      default: false,
      trim: true
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

module.exports = mongoose.model("orders", OrderSchema);
