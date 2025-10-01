// Backend - sampleDataRoutes.js
import express from 'express';
import SampleData from '../models/SampleData.jsx'; // Adjust path according to your project structure

const router = express.Router();

// Fetch all sample data
router.get('/data', async (req, res) => {
  try {
    const data = await SampleData.findAll();
    res.json(data);
  } catch (error) {
    console.error("Error fetching sample data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

export default router;