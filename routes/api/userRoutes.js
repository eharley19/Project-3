const router = require("express").Router();
const controllers = require("../../controllers/userController");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

router.post("/signup", (req, res) => {
  console.log(req.body);
  const requestBody = req.body.data;
  User.findOne({ username: requestBody.username })
      .then((user) => {
      console.log(user);
      if (user) {
        return res.status(409).json({ message: user });
      } else {
        bcrypt.hash(requestBody.password, 10, (err, hash) => {
          if (err) {
            
            return res.status(500).json({ message: requestBody});
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: requestBody.username,
              password: hash,
              name: requestBody.name,
              email: requestBody.email,
              phoneNum: requestBody.phoneNum,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({ message: "User Created" });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({origin: "saved" });
              });
          }
        });
      }
    });
});
router.post("/login", (req, res) => {
  User.findOne({ username: req.body.data.username })
      .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Authorization Failed" });
      }
      bcrypt.compare(req.body.data.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Authorization Failed" });
        }
        if (result) {
          const token = jwt.sign(
            {
              
              user_id: user._id,
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
