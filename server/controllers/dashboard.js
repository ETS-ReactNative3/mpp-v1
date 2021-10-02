const {listFiles} = require('./google.js');

const getDashboardDetailsById = async (req, res, next) => {
    res.status(200).json({dashboard: dashboard});
}

const dashboardInfo = async (req, res, next) => {
    await listFiles(req, res, next);
    res.status(200).json("stories");
}

module.exports = {
  getDashboardDetailsById,
  dashboardInfo,
};
