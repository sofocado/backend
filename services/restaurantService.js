const Restaurant = require("../model/Restaurant");

async function addRestaurant(data) {
  try {
    const newRestaurant = new Restaurant(data);
    const savedRestaurant = await newRestaurant.save();
    return {
      result_code: 0,
      result_msg: "Success!",
      data: {
        rows: savedRestaurant,
      },
    };
  } catch (error) {
    throw error;
  }
}

async function listRestaurants() {
  try {
    const restaurants = await Restaurant.find();
    return {
      result_code: 0,
      result_msg: "Success!",
      data: {
        rows: restaurants,
      },
    };
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
    return {
      result_code: 0,
      result_msg: "Success!",
      data: restaurant,
    };
  } catch (error) {
    throw error;
  }
}

async function updateRestaurant(rid, updatedData) {
  try {
    const restaurant = await Restaurant.findOneAndUpdate(
      { rid: rid },
      { $set: updatedData },
      { new: true }
    );
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    return {
      result_code: 0,
      result_msg: "Success!",
      data: restaurant,
    };
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
