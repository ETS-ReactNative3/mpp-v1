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
    if (!email) {
      return "EMAIL_VALIDATE_ERROR";
    }
    let tokens = await getTokens(email);
    let refreshToken = await getRefreshToken(email);
    if (!refreshToken) {
      return "REFRESH_TOKEN_ERROR";
    }
    let newTokens = await getValidTokens(tokens, refreshToken);
    let updateTokenstoDB = await updateTokens(email, newTokens);
    return {email,newTokens}
}

module.exports = {
    validateAccess
}