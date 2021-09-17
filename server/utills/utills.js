import jwt from 'jsonwebtoken';


const verifyAuthToken = async (req, res, next) => {
    const token = req.session.authtoken;
    if (!token) {
      return res.redirect('/api/user/login');
    }
    //Token Verification need to be done
};

export default {
    verifyAuthToken
}