// FRUIT-GRADING/server.mjs
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import bcrypt from "bcryptjs";
import fs from "fs";
import winston from "winston";
import sequelize from "./src/db.js";
import User from "./src/models/User.js";
import SampleData from "./src/models/SampleData.js";
import SampleLocation from "./src/models/SampleLocation.js";

import userRoutes from "./src/api/userRoutes.js";
import profileRoutes from "./src/api/profileRoutes.js";
import sampleDataRoutes from "./src/api/sampleDataRoutes.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

app.use("/api", userRoutes);
app.use("/api", profileRoutes);
app.use("/api", sampleDataRoutes);

// Synchronisation avec la base de données
sequelize.sync().then(() => {
  console.log("Database connected and synchronized");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    console.error("No file uploaded");
    return res.status(400).send({ error: "No file uploaded" });
  }
  console.log("File uploaded:", req.file.filename);
  res.status(200).send({ filePath: `/${req.file.filename}` });
});

app.put("/api/user/update", async (req, res) => {
  console.log(`Updating user: ${req.body.username}, User ID: ${req.body.id}`);
  const { id, firstName, lastName, role, photo } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.role = role;
      user.photo = photo;
      await user.save();
      console.log(`User updated: ${JSON.stringify(user)}`);
      res.json({ message: "Profile updated successfully", user });
    } else {
      console.log("User not found");
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error });
  }
});

app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = await User.create({
      username,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt: ${username}`);
  try {
    const user = await User.findOne({ where: { username } });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({ username: user.username, role: user.role });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "role"], 
    });
    res.status(200).json(users); 
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
});

app.get("/api/data", async (req, res) => {
  try {
    const data = await SampleData.findAll();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data", error });
  }
});

app.get("/api/locations", async (req, res) => {
  try {
    const locations = await SampleLocation.findAll();
    res.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Error fetching locations", error });
  }
});

app.get("/api/chart-data", async (req, res) => {
  try {
    const labels = ["January", "February", "March", "April", "May", "June"];
    const values = [65, 59, 80, 81, 56, 55];
    res.json({ labels, values });
  } catch (error) {
    console.error("Error fetching chart data:", error);
    res.status(500).json({ message: "Error fetching chart data" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, role, photo } = req.body;

  try {
    const user = await User.findByPk(id);

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.role = role;
      user.photo = photo;

      await user.save();
      res.status(200).json({ message: "Profile updated successfully", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user", error });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" }); 
    } else {
      res.status(404).json({ message: "User not found" }); 
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error }); 
  }
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("/api", userRoutes);
