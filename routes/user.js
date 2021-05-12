const express = require('express');

const router = express.Router();

const User = require('../models/user');

// Getting all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Finding a user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Creating one user
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

// Updating a users info
router.put('/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: 'Deleted User Info' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



// Fetching a pirticular user to a database
async function getUser(req, res, next) {
  console.log("Fetching user");
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      console.log("[geruser]  didnt find user");
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;