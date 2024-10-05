// FRUIT-GRADING/src/api.userRoutes.js
import express from 'express';
import User from '../models/User.js'; // Adjust path according to your project structure

const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
  console.log('fetching users...')
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error("Fetching users failed:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Add a new user
router.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to add user" });
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;