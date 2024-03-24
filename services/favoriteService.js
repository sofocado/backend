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
    return favorites;
  } catch (error) {
    throw error;
  }
}

async function removeFavorite(userId, restaurantId) {
  try {
    await Favorite.deleteOne({ userId, restaurantId });
    const isFavorite = await Favorite.exists({ restaurantId });
    if (!isFavorite) {
      await Restaurant.updateOne(
        { rid: restaurantId },
        { $set: { isFavorite: 0 } }
      );
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addFavorite,
  listFavorites,
  removeFavorite,
};
