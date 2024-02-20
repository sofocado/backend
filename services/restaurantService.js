const Restaurant = require("../model/Restaurant");

async function addRestaurant(data) {
  try {
    const newRestaurant = new Restaurant(data);
    return await newRestaurant.save();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addRestaurant,
};
