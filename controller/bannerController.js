const bannerService = require("../services/bannerService");

const bannerController = {
  async list(req, res) {
    try {
      const rid = req.body.rid || null;
      const banners = await bannerService.getAllBanners(rid);
      res.status(200).json({
        result_code: 0,
        result_msg: "Success!",
        data: { recordcount: banners.length, rows: banners },
      });
    } catch (err) {
      res.status(500).json({ result_code: 1, result_msg: err.message });
    }
  },

  async add(req, res) {
    try {
      const { rid, path, startTime, endTime } = req.body;
      const newBanner = await bannerService.addBanner(
        rid,
        path,
        startTime,
        endTime
      );
      res.status(200).json({
        result_code: 0,
        result_msg: "Success!",
        data: newBanner,
      });
    } catch (err) {
      res.status(500).json({ result_code: 1, result_msg: err.message });
    }
  },

  async get(req, res) {
    try {
      const { rid, bannerId } = req.body;
      let query = {};
      if (rid && bannerId) {
        query = { rid: rid, bannerId: bannerId };
      } else if (rid) {
        query = { rid: rid };
      } else if (bannerId) {
        query = { bannerId: bannerId };
      } else {
        return res.status(400).json({
          result_code: 0,
          result_msg: "Both rid and bannerId are required",
          data: null,
        });
      }

      const banner = await bannerService.getBannerByQuery(query);
      if (!banner) {
        return res.status(404).json({
          result_code: 0,
          result_msg: "Banner not found",
          data: null,
        });
      }
      res.status(200).json({
        result_code: 0,
        result_msg: "Success!",
        data: banner,
      });
    } catch (err) {
      res.status(500).json({ result_code: 1, result_msg: err.message });
    }
  },

  async delete(req, res) {
    try {
      const bannerId = req.body.bannerId;
      const deletedBanner = await bannerService.deleteBannerById(bannerId);
      if (!deletedBanner) {
        return res.status(404).json({
          result_code: 0,
          result_msg: "Banner not found",
          data: null,
        });
      }
      res.status(200).json({
        result_code: 0,
        result_msg: "Banner deleted successfully",
      });
    } catch (err) {
      res.status(500).json({ result_code: 1, result_msg: err.message });
    }
  },
};

module.exports = bannerController;
