const restaurantService = require("../services/restaurantService");

async function addRestaurant(req, res) {
  try {
    const restaurant = await restaurantService.addRestaurant(req.body);
    res.status(200).json({
      result_code: 0,
      message: "Restaurant added successfully",
      data: restaurant,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function listRestaurants(req, res) {
  try {
    const restaurants = await restaurantService.listRestaurants();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getRestaurant(req, res) {
  try {
    const restaurantName = req.body.rid;
    const restaurant = await restaurantService.getRestaurantByRid(
      restaurantName
    );
    res.json(restaurant);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function updateRestaurant(req, res) {
  try {
    const restaurantRid = req.body.rid;
    const imagePath = req.file ? req.file.path : null;
    const updatedData = {
      address: req.body.address,
      countTable: req.body.countTable,
      description: req.body.description,
      category: req.body.category,
      isFavorite: req.body.isFavorite,
      name: req.body.name, 
      workstarttime: req.body.workstarttime,
      workendtime: req.body.workendtime,
      path: imagePath, 
    };

    const restaurant = await restaurantService.updateRestaurant(
      restaurantRid,
      updatedData
    );

    res.status(200).json({
      result_code: 0,
      message: "Ресторан успешно обновлен",
      data: restaurant,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}



module.exports = {
  addRestaurant,
  listRestaurants,
  getRestaurant,
  updateRestaurant,
};
