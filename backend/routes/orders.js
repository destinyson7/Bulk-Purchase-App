require("dotenv").config();

const router = require("express").Router();
let Order = require("./../models/order");
const { check, validationResult } = require("express-validator");

// Getting all the users
router.route("/").get((req, res) => {
  Order.find(function(err, orders) {
    if (err) {
      console.log(err);
    } else {
      res.json(orders);
    }
  });
});

router.post("/add", [check("quantity").isNumeric()], (req, res) => {
  // console.log("here");
  // console.log(req.body);
  let order = new Order({
    customerID: req.body.customerID,
    productID: req.body.productID,
    quantity: req.body.quantity,
    sellerID: req.body.sellerID
  });

  console.log("here", order);
  // console.log("heyya");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  order
    .save()
    .then(order => {
      res.status(200).json({ Order: "Order added successfully" });
    })
    .catch(err => {
      // console.log("yep", err);
      res.status(400).send(err);
    });
});

// Getting a user by id
router.route("/:id", (req, res) => {
  let id = req.params.id;
  Order.findById(id, function(err, order) {
    res.json(order);
  });
});

//
// router.post("/delete", (req, res) => {
//   let id = req.body.id;
//   Product.deleteOne({ _id: id })
//     .exec()
//     .then(res => {
//       res.status(200).send("deleted");
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });
//
// router.post("/cancel", (req, res) => {
//   let id = req.body.id;
//   Product.findByIdAndUpdate({ _id: id }, { isCancelled: true })
//     .exec()
//     .then(res => {
//       res.status(200).send("cancelled");
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });
//
// router.post("/ready", (req, res) => {
//   let sellerID = req.body.sellerID;
//
//   console.log(sellerID);
//
//   Product.find({
//     sellerID: sellerID,
//     isCancelled: false,
//     quantityRemaining: 0,
//     isReady: true,
//     hasDispatched: false
//   })
//     .then(products => {
//       res.status(200).json(products);
//     })
//     .catch(err => {
//       res.status(200).send(err);
//       console.log(err);
//     });
// });
//
// router.post("/dispatch", (req, res) => {
//   let id = req.body.id;
//   Product.findByIdAndUpdate({ _id: id }, { hasDispatched: true })
//     .exec()
//     .then(res => {
//       res.status(200).send("cancelled");
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });
//
// router.post("/dispatched", (req, res) => {
//   let sellerID = req.body.sellerID;
//
//   console.log(sellerID);
//
//   Product.find({
//     sellerID: sellerID,
//     isCancelled: false,
//     hasDispatched: true
//   })
//     .then(products => {
//       res.status(200).json(products);
//     })
//     .catch(err => {
//       res.status(200).send(err);
//       console.log(err);
//     });
// });

module.exports = router;
