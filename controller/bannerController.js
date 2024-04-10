// bannerController.js
const bannerService = require("../services/bannerService");

const bannerController = {
  async list(req, res) {
    try {
      const banners = await bannerService.getAllBanners();
      res.status(200).json({
        result_code: 0,
        result_msg: "Banners fetched successfully",
        data: { recordcount: banners.length, rows: banners },
      });
    } catch (err) {
      res.status(500).json({ result_code: 1, result_msg: err.message });
    }
  },

  async add(req, res) {
    try {
      const { path, startTime, endTime } = req.body;
      const newBanner = await bannerService.addBanner(path, startTime, endTime);
      res.status(200).json({
        result_code: 0,
        result_msg: "Banner added successfully",
        data: newBanner,
      });
    } catch (err) {
      res.status(500).json({ result_code: 1, result_msg: err.message });
    }
  },

  async get(req, res) {
    try {
      const { bannerId } = req.body;
      const banner = await bannerService.getBannerById(bannerId);
      if (!banner) {
        return res.status(404).json({
          result_code: 1,
          result_msg: "Banner not found",
          data: null,
        });
      }
      res.status(200).json({
        result_code: 0,
        result_msg: "Banner fetched successfully",
        data: banner,
      });
    } catch (err) {
      res.status(500).json({ result_code: 1, result_msg: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { bannerId } = req.body;
      const deletedBanner = await bannerService.deleteBannerById(bannerId);
      if (!deletedBanner) {
        return res.status(404).json({
          result_code: 1,
          result_msg: "Banner not found",
          data: null,
        });
      }
      res.status(200).json({
        result_code: 0,
        result_msg: "Banner deleted successfully",
        data: null,
      });
    } catch (err) {
      res.status(500).json({ result_code: 1, result_msg: err.message });
    }
  },
};

module.exports = bannerController;
