const Restaurant = require("../model/Restaurant");

async function addRestaurant(data) {
  try {
    const savedRestaurant = await new Restaurant(data).save();
    return {
      result_code: 0,
      result_msg: "Success!",
      data: savedRestaurant,
    };
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

async function updateRestaurant(rid, data) {
  try {
    const restaurant = await Restaurant.findOne({ rid: rid });
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        restaurant[key] = data[key];
      }
    }
    await restaurant.save();

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
