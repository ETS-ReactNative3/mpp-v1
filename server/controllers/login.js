const {
  loginUserService,
  getUserService,
  addCredentialsService,
} = require('../service/user.js');
const { responder } = require('../utills/responseHandler.js');

const loginUser = async (req, res, next) => {
  try {
    const user = await loginUserService(req.body);
    console.log(user);
    return responder(res)(null, user);
  } catch (ex) {
    return next(ex);
  }
};

const getuser = async (req, res, next) => {
  try {
    const user = await getUserService(req.body);
    return responder(res)(null, { user });
  } catch (ex) {
    return next(ex);
  }
};

const updateuser = async (req, res, next) => {
  try {
    const user = await addCredentialsService(req.body, req.body.email);
    return responder(res)(null, { user });
  } catch (ex) {
    return next(ex);
  }
};

module.exports = {
  loginUser,
  getuser,
  updateuser,
};
