const Favorite = require("../model/Favorite");
const Restaurant = require("../model/Restaurant")

async function addFavorite(userId, restaurantId) {
  try {
    const newFavorite = new Favorite({ userId, restaurantId });
    const savedFavorite = await newFavorite.save();
    await Restaurant.updateOne(
      { rid: restaurantId },
      { $set: { isFavorite: 1 } }
    );

    return savedFavorite;
  } catch (error) {
    throw error;
  }
}

async function listFavorites(userId) {
  try {
    const favorites = await Favorite.find({ userId });
    const restaurantIds = favorites.map((favorite) => favorite.restaurantId);

    const favoriteRestaurants = await Restaurant.find({
      rid: { $in: restaurantIds },
    });

    const favoriteRestaurantsWithFlag = favoriteRestaurants.map(
      (restaurant) => ({
        ...restaurant.toObject(),
        isFavorite: 1,
      })
    );

    return favoriteRestaurantsWithFlag;
  } catch (error) {
    throw error;
  }
}

async function removeFavorite(userId, restaurantId) {
  try {
    await Favorite.deleteOne({ userId, restaurantId });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addFavorite,
  listFavorites,
  removeFavorite,
};
