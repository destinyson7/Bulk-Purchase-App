require("dotenv").config();

const router = require("express").Router();
let Order = require("./../models/order");
let Product = require("../models/product");
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

router.post("/buy", (req, res) => {
  const id = req.body.productID;
  const customerID = req.body.customerID;
  const buyQuantity = req.body.buyQuantity;

  console.log("parameters are", req.body);

  Product.find(
    {
      _id: id
    },
    (err, products) => {
      if (err) {
        return res.status(200).json(err);
      }

      console.log(products);

      let quantityRemaining = products[0].quantityRemaining;

      if (quantityRemaining < buyQuantity) {
        return res.status(200).json({ success: false });
      }

      let order1 = new Order({
        productID: id,
        customerID: customerID,
        quantity: buyQuantity
      });

      console.log("new order is", order1);

      quantityRemaining -= buyQuantity;

      if (quantityRemaining !== 0) {
        Product.findByIdAndUpdate(
          { _id: id },
          { quantityRemaining: quantityRemaining },
          (err, product) => {
            if (err) {
              return res.status(200).json(err);
            }
            console.log("if");
            order1.save();
            console.log("if saved");
            return res.status(200).json({ success: true });
          }
        );
      } else {
        Product.findByIdAndUpdate(
          { _id: id },
          { quantityRemaining: 0, isReady: true },
          (err, product) => {
            if (err) {
              return res.status(200).json(err);
            }
            console.log("else");
            order1.save();
            console.log("else saved");
            return res.status(200).json({ success: true });
          }
        );
      }
    }
  );
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
