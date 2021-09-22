const dashboardUtills = require('../utills/storyline.js');


const getDashboardDetailsById = async (req, res, next) => {
    const dashboard =  dashboardUtills.dashboardDetails();
    res.status(200).json({dashboard: dashboard});
}

const dashboardInfo = async (req, res, next) => {
    const dashboard =  dashboardUtills.dashboardDetails();
    res.status(200).json({dashboard: dashboard});
}

module.exports =  {
    getDashboardDetailsById,
    dashboardInfo
}