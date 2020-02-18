const router = require("express").Router();
let User = require("./../models/user");
const { check, validationResult } = require("express-validator");

// Getting all the users
router.route("/").get((req, res) => {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// Adding a new user
router.post(
  "/register",
  [
    check("email").isEmail(),
    check("firstName").isAlpha(),
    check("lastName").isAlpha()
  ],
  (req, res) => {
    let user = new User(req.body);
    // console.log(user);
    // console.log("heyya");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    user
      .save()
      .then(user => {
        res.status(200).json({ User: "User added successfully" });
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  }
);

// Getting a user by id
router.route("/:id").get((req, res) => {
  let id = req.params.id;
  User.findById(id, function(err, user) {
    res.json(user);
  });
});

// router.route('/login').get((req, res) => {
//     let email = req.params.email;
//     let password = req.params.password;
//
//
// });

module.exports = router;
