const {
    getEmail
} = require('./utills.js');
const {
    getTokens,
    getRefreshToken,
    updateTokens
} = require('../service/user.js');
const {
    getValidTokens,
}  = require('./google.js');



const validateAccess = async (req, res, next) => {
    let email = await getEmail(req, res, next);
    let error = null;
    if (!email) {
        error =  "EMAIL_VALIDATE_ERROR : Please login and try again.";
        return {error}
    }
    let tokens = await getTokens(email);
    let refreshToken = await getRefreshToken(email);
    if (!refreshToken) {
      error = "REFRESH_TOKEN_ERROR : Please revoke access and link drive.";
      return {error}
    }
    let newTokens = await getValidTokens(tokens, refreshToken);
    let updateTokenstoDB = await updateTokens(email, newTokens);
    return {email,newTokens,error}
}

module.exports = {
    validateAccess
}