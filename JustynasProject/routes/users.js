const UserConverter = require("../converters/userconverter");
const express = require("express");
const router = express.Router();
const User = require("../models/users").model;

module.exports = router;

// Get all user
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    let usersfromdb = users.map(UserConverter.prototype.convertFromDB);

    res.json(usersfromdb);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get one user
router.get("/:id", async (req, res) => {
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cant find user" });
    }
    let convertedUser = UserConverter.prototype.convertFromDB(user);

    res.json(convertedUser);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Create one user
router.post("/", async (req, res) => {
  try {
    const user = new User({ name: "string2" });
    const newUser = await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
