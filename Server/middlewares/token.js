const jwt = require('jsonwebtoken');
require('dotenv').config();

const SecureToken = async(uid)=>{
    try {
        const token = jwt.sign({uid},process.env.SECRET_KEY,{expiresIn:'300s'})
        return token
    } catch (error) {
        return {
            message:'Error in token creation ',
            data:error
        }
    }
}
const VerifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json(appResponse('No token provided', false, null));
    }
    jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, decoded) => {
        if (err) {
            return res.status(403).json(appResponse('Invalid token', false, null));
        }
        req.admin = decoded;
        next();
    });
};
module.exports = {SecureToken,VerifyToken}