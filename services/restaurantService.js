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
    if (filters.filter) {
      if (filters.filter.keyword) {
        query.name = { $regex: filters.filter.keyword, $options: "i" };
      }

      if (
        filters.filter.category !== undefined &&
        filters.filter.category !== ""
      ) {
        query.category = filters.filter.category;
      }

      if (
        filters.filter.parking !== undefined &&
        filters.filter.parking !== null
      ) {
        query.parking = parseInt(filters.filter.parking);
      }

      if (
        filters.filter.prayingRoom !== undefined &&
        filters.filter.prayingRoom !== null
      ) {
        query.prayingRoom = parseInt(filters.filter.prayingRoom);
      }
    }

    const sortOptions = {};
    filters.sort.forEach((sortObj) => {
      sortOptions[sortObj.key] = sortObj.isAsc === 0 ? 1 : -1;
    });

    const restaurants = await Restaurant.find(query).sort(sortOptions);
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
