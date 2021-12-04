const {
  loginUserService,
  getUserService,
  addCredentialsService,
} = require('../service/user.js');

const { 
  LOGIN_SUCCESS,
  LOGIN_FAILED
} = require('../utills/errors/constants.js');

const loginUser = async (req, res, next) => {
  try {
    const user = await loginUserService(req.body.email,req);
      return res.status(200).send({msg: LOGIN_SUCCESS,user})
  } catch (err) {
    return res.status(401).send({msg: LOGIN_FAILED,err});
  }
};

const getuser = async (req, res, next) => {
  try {
    const user = await getUserService(req.body);
    if(!user){
      return res.status(404).send({msg: 'User does not exists'});
    }
    return res.status(200).send({user})
  } catch (ex) {
    return next(ex);
  }
};

const updateuser = async (req, res, next) => {
  try {
    const user = await addCredentialsService(req.body, req.body.email);
    if(!user){
      return res.status(400).send({msg: 'Error updating user'})
    }
    return res.status(200).send({msg: 'User successfully updated',user})
  } catch (ex) {
    return next(ex);
  }
};

module.exports = {
  loginUser,
  getuser,
  updateuser,
};
