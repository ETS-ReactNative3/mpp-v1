const { listFiles } = require('./google/google.js');

const getDashboardDetailsById = async (req, res, next) => {
  res.status(200).json({ dashboard });
};

const dashboardInfo = async (req, res, next) => {
  await listFiles(req, res, next);
};

module.exports = {
  getDashboardDetailsById,
  dashboardInfo,
};
