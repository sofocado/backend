const Banner = require("../model/Banner");

const bannerController = {
  list: async (req, res) => {
    try {
      const banners = await Banner.find();
      res.status(200).json({
        result_code: 0,
        message: "Banners fetched successfully",
        data: banners,
      });
    } catch (err) {
      res.status(500).json({ result_code: 1, message: err.message });
    }
  },

  add: async (req, res) => {
    try {
      const { path } = req.body;
      const newBanner = new Banner({ path });
      await newBanner.save();
      res.status(200).json({
        result_code: 0,
        message: "Banner added successfully",
        data: newBanner,
      });
    } catch (err) {
      res.status(500).json({ result_code: 1, message: err.message });
    }
  },

  get: async (req, res) => {
    try {
      const { id } = req.params;
      const banner = await Banner.findOne({ bannerId: id });
      if (!banner) {
        return res.status(404).json({
          result_code: 1,
          message: "Banner not found",
          data: null,
        });
      }
      res.status(200).json({
        result_code: 0,
        message: "Banner fetched successfully",
        data: banner,
      });
    } catch (err) {
      res.status(500).json({ result_code: 1, message: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBanner = await Banner.findOneAndDelete({ bannerId: id });
      if (!deletedBanner) {
        return res.status(404).json({
          result_code: 1,
          message: "Banner not found",
          data: null,
        });
      }
      res.status(200).json({
        result_code: 0,
        message: "Banner deleted successfully",
        data: null,
      });
    } catch (err) {
      res.status(500).json({ result_code: 1, message: err.message });
    }
  },
};

module.exports = bannerController;
