const restaurantService = require("../services/restaurantService");

async function addRestaurant(req, res) {
  try {
    const restaurant = await restaurantService.addRestaurant(req.body);
    res
      .status(201)
      .json({ message: "Restaurant added successfully", data: restaurant });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  addRestaurant,
};