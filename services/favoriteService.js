const Favorite = require("../model/Favorite");

async function addFavorite(rid, uid) {
  try {
    const favorite = new Favorite({ restaurant: rid, user: uid });
    await favorite.save();
    return {
      result_code: 0,
      result_msg: "Success! Restaurant added to favorites.",
    };
  } catch (error) {
    throw error;
  }
}

async function listFavorites(uid) {
  try {
    const favorites = await Favorite.find({ user: uid }).populate(
      "restaurant"
    );
    return {
      result_code: 0,
      result_msg: "Success! Here are your favorite restaurants.",
      data: favorites,
    };
  } catch (error) {
    throw error;
  }
}

async function removeFavorite(rid, uid) {
  try {
    await Favorite.findOneAndRemove({ restaurant: rid, user: uid });
    return {
      result_code: 0,
      result_msg: "Success! Restaurant removed from favorites.",
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addFavorite,
  listFavorites,
  removeFavorite,
};
