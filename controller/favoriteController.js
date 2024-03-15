const favoriteService = require("../services/favoriteService");

async function addFavorite(req, res) {
  try {
    const { rid } = req.body;
    const uid = req.user.uid; // Assuming user is authenticated and user id is available in request
    const result = await favoriteService.addFavorite(rid, uid);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function listFavorites(req, res) {
  try {
    const uid = req.user.uid; // Assuming user is authenticated and user id is available in request
    const result = await favoriteService.listFavorites(uid);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function removeFavorite(req, res) {
  try {
    const { rid } = req.body;
    const uid = req.user.uid; // Assuming user is authenticated and user id is available in request
    const result = await favoriteService.removeFavorite(rid, uid);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  addFavorite,
  listFavorites,
  removeFavorite,
};
