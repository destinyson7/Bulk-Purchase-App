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

router.post("/view", (req, res) => {
  const customerID = req.body.customerID;

  console.log("parameters are", req.body);

  Order.find(
    {
      customerID: customerID
    },
    (err, orders) => {
      if (err) {
        return res.status(200).json(err);
      }

      toRet = [];
      let done = 0;
      if (orders.length === 0) {
        return res.status(200).send(toRet);
      } else {
        for (var i = 0; i < orders.length; i++) {
          let order = orders[i];
          Product.find(
            {
              _id: order.productID
            },
            (err, product) => {
              if (err) {
                return res.status(500).json(err);
              }

              let temp = {};
              temp._id = order._id;
              temp.id = done + 1;
              temp.name = product[0].name;
              temp.quantity = order.quantity;

              if (product[0].isCancelled) {
                temp.status = "Cancelled";
                temp.color = "red";
              } else if (product[0].hasDispatched) {
                temp.status = "Dispatched";
                temp.color = "green";
              } else if (
                product[0].isReady ||
                product[0].quantityRemaining === 0
              ) {
                temp.status = "Placed";
                temp.color = "purple";
              } else {
                temp.status = "Waiting";
                temp.color = "black";
              }

              toRet.push(temp);
              done++;
              // console.log(i + 1, temp);
              // console.log(done, toRet);

              if (done === orders.length) {
                return res.status(200).send(toRet);
              }
            }
          );
        }

        // return res.status(200).send(toRet);
      }
    }
  );
});

module.exports = router;
