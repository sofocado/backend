const Favorite = require("../model/Favorite");
const Restaurant = require("../model/Restaurant")

async function addFavorite(uid, rid) {
  try {
    const newFavorite = new Favorite({ uid, rid });
    const savedFavorite = await newFavorite.save();
    await Restaurant.updateOne(
      { rid: rid },
      { $set: { isFavorite: 1 } }
    );

    return savedFavorite;
  } catch (error) {
    throw error;
  }
}

async function listFavorites(uid) {
  try {
    const favorites = await Favorite.find({ uid });
    const rids = favorites.map((favorite) => favorite.rid);

    const favoriteRestaurants = await Restaurant.find({
      rid: { $in: rids },
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

async function removeFavorite(uid, rid) {
  try {
    await Favorite.deleteOne({ uid, rid });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addFavorite,
  listFavorites,
  removeFavorite,
};
