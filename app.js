require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { authenticateToken } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const uploadRoutes = require("./routes/upload");
const categoryRoutes = require("./routes/categoryRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const tableRoutes = require("./routes/tableRoutes");
const menuRoutes = require("./routes/menuRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const menuCategoryRoutes = require("./routes/menuCategoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cardRoutes = require("./routes/cardRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const updateStatusReservation = require("./middleware/updateReservationStatuses");
const app = express();

app.use(cors());
app.use(express.json());

const posts = {};
updateStatusReservation();

app.use("/auth", authRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/category", categoryRoutes);
// app.use("/category", authenticateToken, categoryRoutes);
app.use("/favorite", favoriteRoutes);
app.use("/banner", bannerRoutes);
app.use("/reservation", reservationRoutes);
app.use("/table", tableRoutes);
app.use("/menu", menuRoutes);
app.use("/menu/category", menuCategoryRoutes);
app.use("/review", reviewRoutes);
app.use("/order", orderRoutes);
app.use("/card", cardRoutes);
app.use("/transaction", transactionRoutes);

app.use("/upload", uploadRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.listen(1001, () => {
  console.log("Server is running on port 1001");
});
