const restaurantService = require("../services/restaurantService");

async function addRestaurant(req, res) {
  try {
    const restaurant = await restaurantService.addRestaurant(req.body);
    res.status(200).json({
      result_code: 0,
      result_msg: "Success!",
      data: restaurant,
    });
  } catch (error) {
    res.status(400).json({ result_code: -1, result_msg: error.message });
  }
}

async function listRestaurants(req, res) {
  try {
    const filters = {
      sort: req.body.sort || [],
      filter: req.body.filter || {}, 
    };

    const restaurants = await restaurantService.listRestaurants(filters);
    res.json({
      result_code: 0,
      result_msg: "Success!",
      data: {
        recordcount: restaurants.length,
        rows: restaurants,
      },
    });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

async function getRestaurant(req, res) {
  try {
    const restaurantRid = req.body.rid;
    const restaurant = await restaurantService.getRestaurantByRid(
      restaurantRid
    );
    res.json({
      result_code: 0,
      result_msg: "Success!",
      data: restaurant,
    });
  } catch (error) {
    res.status(404).json({ result_code: -3, result_msg: error.message });
  }
}

async function updateRestaurant(req, res) {
  try {
    const { rid, ...updatedData } = req.body;
    const updatedRestaurant = await restaurantService.updateRestaurant(
      rid,
      updatedData
    );
    res.json({
      result_code: 0,
      result_msg: "Success!",
      data: updatedRestaurant,
    });
  } catch (error) {
    res.status(500).json({ result_msg: error.message });
  }
}

module.exports = {
  addRestaurant,
  listRestaurants,
  getRestaurant,
  updateRestaurant,
};
