const Banner = require("../model/Banner");

const bannerService = {
  async getAllBanners() {
    return await Banner.find();
  },

  async addBanner(path, startTime, endTime) {
    const newBanner = new Banner({ path, startTime, endTime });
    return await newBanner.save();
  },

  async getBannerById(id) {
    return await Banner.findOne({ bannerId: id });
  },

  async deleteBannerById(id) {
    return await Banner.findOneAndDelete({ bannerId: id });
  },
};

module.exports = bannerService;
