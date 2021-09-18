import dashboardUtills from '../utills/storyline.js';


const getDashboardDetailsById = async (req, res, next) => {
    const dashboard =  dashboardUtills.dashboardDetails();
    res.status(200).json({dashboard: dashboard});
}

const dashboardInfo = async (req, res, next) => {
    const dashboard =  dashboardUtills.dashboardDetails();
    res.status(200).json({dashboard: dashboard});
}

export default {
    storySave
}