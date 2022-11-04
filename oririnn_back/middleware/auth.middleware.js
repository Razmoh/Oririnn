// require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRETKEY

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token.slice(7), SECRET);
    }

    catch(err) {
        return "Invalid token"
    }
}

function admin(token){
    let decoded = jwt.decode(token.slice(7));
    decoded.admin = parseInt(decoded.admin)
    if (decoded.admin !== 1) {
        return "Forbidden"
    }
}

function userRights(token, user_id){
    user_id = parseInt(user_id)
    const decoded = jwt.decode(token.slice(7));
    if (decoded.id !== user_id) {
        return "Forbidden"
    }
}

module.exports = {verifyToken, admin, userRights};