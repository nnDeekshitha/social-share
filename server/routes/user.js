const express = require("express");
const bcrypt = require("bcryptjs");

//Schema
const User = require("../models/UserSchema");

const router = express.Router();

// @Path        : /user/register
// @description : Add the user (Post request)
// @Access      : PUBLIC
router.post("/register", (req, res, next) => {
  const { email, password, user_name } = req.body;

  if (!email | !password || !user_name)
    return res.status(400).json({ msg: "Enter all credentials" });

  var query = {
    $or: [{ email: email }],
  };
  User.findOne(query).then((user) => {
    if (user) {
      if (user.email === email)
        return res.status(400).json({ msg: "Email Already exist" });
    }

    const newUser = new User({
      email: email,
      user_name: user_name,
      password: password,
    });

    bcrypt.genSalt((err, salt) => {
      if (err) return res.status(400).json(err);

      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) return res.status(400).json(err);

        function makeid(length) {
          var result = "";
          var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          var charactersLength = characters.length;
          for (var i = 0; i < length; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            );
          }
          return result;
        }

        newUser.password = hash;
        newUser.id = makeid(12);

        newUser
          .save()
          .then((user) => {
            return res.json({
              msg: "Registered Successfully..!",
              user: {
                id: user.id,
                user_name: user.user_name,
                email: user.email,
              },
            });
          })
          .catch((err) => {
            return res.status(400).json(err);
          });
      });
    });
  });
});

// @Path          : /user/login
// @description   : authorization
// @Access        : Public
router.post("/login", (req, res) => {
  const { user_name, password } = req.body;

  if (!user_name || !password)
    return res.status(400).json({ msg: "Enter all fields" });
  var query = {
    $or: [{ email: user_name }, { user_name: user_name }],
  };
  User.findOne(query)
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "Email not registered" });

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Incorrect Credentials" });

        return res.status(200).json({
          user: {
            id: user._id,
            email: user.email,
            user_name: user.user_name,
          },
        });
      });
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Unhandled Error", err });
    });
});

// @Path          : /user/all
// @description   : gets particular user
// @Access        : Private               (used custom middleware)
router.get("/all", (req, res) => {
  User.find()
    .select("-user_password")
    .sort({ user_name: 1 })
    .then((users) => {
      return res.json(users);
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Failed to get users" });
    });
});

// @Path          : /user/:id
// @description   : gets particular user
// @Access        : Public
router.get("/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      if (!user)
        return res.json({ msg: `No user found with id: ${req.params.id}` });

      return res.json(user);
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Failed to get user details", err });
    });
});

// @Path          : /user/:id
// @description   : update particular user
// @Access        : Private
router.put("/:id", (req, res) => {
  const { user_name } = req.body;
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) res.status(404).json({ msg: "user not found" });

      const updates = {};
      if (user_name) updates.user_name = user_name;

      User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            ...updates,
          },
        }
      )
        .then(() => {
          return res.json({ msg: "Updated User" });
        })
        .catch((err) => {
          return res.json({ msg: "error", error: err });
        });
    })
    .catch((err) => {
      return res.json({ msg: "Error", error: err });
    });
});

// @Path          : /user/:id
// @description   : Remove attribute (delete request)
// @Access        : Private
router.delete("/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user)
        return res
          .status(404)
          .json({ msg: `No user found for id: ${user.id}` });

      User.deleteOne({ _id: req.params.id })
        .then(() => {
          return res.json({ msg: "Deleted" });
        })
        .catch((err) => {
          return res
            .status(400)
            .json({ msg: "Delete Action failed", error: err });
        });
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Failed to get user" });
    });
});

module.exports = router;
