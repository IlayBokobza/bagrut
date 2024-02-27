const User = require('../models/user')
const jwt = require('jsonwebtoken')
const RestError = require('../utils/restError')

async function auth(req,res,next){
    try {
        const token = req.cookies.token

        if (!token) {
            throw new RestError(400)
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        let id = decoded._id;

        if (!id) throw new RestError(400, "לא ניתן להתחבר, נא נסה שוב");

        const user = await User.findById(id)


        if(!user || !user.tokens.includes(token)){
            throw new RestError(404);
        }

        req.user = user;

        next()
    } catch (e) {
        RestError.handle(e, res)
    }
}

module.exports = auth;