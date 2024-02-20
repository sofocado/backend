require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { authenticateToken } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.use("/auth", authRoutes);
app.use("/restaurant", restaurantRoutes);

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.listen(1001, () => {
  console.log("Server is running on port 1001");
});