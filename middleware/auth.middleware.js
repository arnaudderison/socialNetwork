const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

module.exports.checkUser = (req, res, next) =>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodeToken) =>{
            if(err){
                res.locals.user = nul;
                res.cookie('jwt', '', {maxAge: 1})
                next()
            }else{
                let user = await userModel.findById(decodeToken.id)
                res.locals.user = user;
                next()
            }
        })
    }else{
        res.locals.user = null;
        next()
    }
}

module.exports.requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodeToken) =>{
            if(err){
                console.log(err)
            }else{
                console.log(decodeToken.id)
                next()
            }
        })
    }else{
        console.log('No token')
    }
}