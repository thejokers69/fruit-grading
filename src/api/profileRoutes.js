// FRUIT_GRADING/src/api/profileRoutes.js
import express from 'express';
import User from '../models/User.js'; // Adjust path according to your project structure

const router = express.Router();

// Update user profile
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
    res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;
