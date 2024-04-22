const Banner = require("../model/Banner");

const bannerService = {
  async getAllBanners(rid) {
    const query = rid ? { rid: rid } : {};
    return await Banner.find(query);
  },

  async addBanner(rid, path, startTime, endTime) {
    const newBanner = new Banner({ rid, path, startTime, endTime });
    return await newBanner.save();
  },

  async getBannerByQuery(query) {
    return await Banner.findOne(query);
  },

  async deleteBannerById(id) {
    return await Banner.findOneAndDelete({ bannerId: id });
  },
};

module.exports = bannerService;
