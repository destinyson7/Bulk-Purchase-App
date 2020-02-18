require("dotenv").config();

const router = require("express").Router();
let Product = require("./../models/product");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Getting all the users
router.route("/").get((req, res) => {
  Product.find(function(err, products) {
    if (err) {
      console.log(err);
    } else {
      res.json(products);
    }
  });
});

// Adding a new user
router.post(
  "/add",
  [check("price").isNumeric(), check("quantity").isNumeric()],
  (req, res) => {
    // console.log("here");
    // console.log(req.body);
    let product = new Product({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      sellerID: req.body.sellerID,
      quantityRemaining: req.body.quantity
    });

    console.log("here", product);
    // console.log("heyya");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    product
      .save()
      .then(product => {
        res.status(200).json({ Product: "Product added successfully" });
      })
      .catch(err => {
        console.log("yep", err);
        res.status(400).send(err);
      });
  }
);

// Getting a user by id
router.route("/:id", (req, res) => {
  let id = req.params.id;
  Product.findById(id, function(err, product) {
    res.json(product);
  });
});

router.post("/seller", (req, res) => {
  let sellerID = req.body.sellerID;

  console.log(sellerID);

  Product.find({
    sellerID: sellerID,
    isCancelled: false,
    isReady: false,
    hasDispatched: false
  })
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => {
      res.status(200).send(err);
      console.log(err);
    });
});

router.post("/delete", (req, res) => {
  let id = req.body.id;
  Product.deleteOne({ _id: id })
    .exec()
    .then(res => {
      res.status(200).send("deleted");
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/cancel", (req, res) => {
  let id = req.body.id;
  Product.findByIdAndUpdate({ _id: id }, { isCancelled: true })
    .exec()
    .then(res => {
      res.status(200).send("cancelled");
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/ready", (req, res) => {
  let sellerID = req.body.sellerID;

  console.log(sellerID);

  Product.find({
    sellerID: sellerID,
    isCancelled: false,
    quantityRemaining: 0,
    isReady: true,
    hasDispatched: false
  })
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => {
      res.status(200).send(err);
      console.log(err);
    });
});

router.post("/dispatch", (req, res) => {
  let id = req.body.id;
  Product.findByIdAndUpdate({ _id: id }, { hasDispatched: true })
    .exec()
    .then(res => {
      res.status(200).send("cancelled");
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/dispatched", (req, res) => {
  let sellerID = req.body.sellerID;

  console.log(sellerID);

  Product.find({
    sellerID: sellerID,
    isCancelled: false,
    hasDispatched: true
  })
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => {
      res.status(200).send(err);
      console.log(err);
    });
});

module.exports = router;
