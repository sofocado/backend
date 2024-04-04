const Restaurant = require("../model/Restaurant");

async function addRestaurant(data) {
  try {
    return await new Restaurant(data).save();
  } catch (error) {
    throw error;
  }
}

async function listRestaurants(filters) {
  try {
    let query = {};

    if (filters.keyword) {
      query.name = { $regex: filters.keyword, $options: "i" };
    }

    if (filters.categorySort !== undefined && filters.categorySort !== "") {
      query.category = filters.categorySort;
    }

    const restaurants = await Restaurant.find(query);
    return restaurants;
  } catch (error) {
    throw error;
  }
}

async function getRestaurantByRid(rid) {
  try {
    const restaurant = await Restaurant.findOne({ rid: rid });
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    return restaurant;
  } catch (error) {
    throw error;
  }
}

async function updateRestaurant(rid, data) {
  try {
    const restaurant = await Restaurant.findOneAndUpdate({ rid: rid }, data, {
      new: true,
    });
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    return restaurant;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addRestaurant,
  listRestaurants,
  getRestaurantByRid,
  updateRestaurant,
};
