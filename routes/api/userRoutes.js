const router = require("express").Router();
const controllers = require("../../controllers/userController");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

router.post("/signup", (req, res) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user) {
        return res.status(409).json({ message: "Username exists" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              password: hash,
              email: req.body.email,
              phoneNum: req.body.phoneNum,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({ message: "User Created" });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ error: err });
              });
          }
        });
      }
    });
});
router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user) {
        return res.status(401).json({ message: "Authorization Failed" });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Authorization Failed" });
        }
        if (result) {
          const token = jwt.sign(
            {
              name: user[0].name,
              user_id: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res
            .status(200)
            .json({ message: "Authorization Successful", token: token });
        }
        res.status(401).json({ message: "Authorization Failed" });
      });
    });
});

module.exports = router;
