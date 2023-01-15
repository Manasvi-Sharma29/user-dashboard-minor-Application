const userModel = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const authentication = async function(req,res,next){
    try{
        let token = req.headers.authorization || req.headers.Authorization
        if(!token){
            return res.status(401).send({status:false,message:"You're not logged in"})
        }
        jwt.verify(token,"rt647ysbwf$#@%&*ejm",function(error,decoded){
            if(error){
                return res.status(401).send({status:false,message:"You're not logged in"})
            }else{
                req.token = decoded
                next()
            }
        })
    }catch(error){
        return res.status(500).send({status:false,Error:error.message})
    }
}

let authorization = async function(req,res,next){
    try{
        let userId = req.params.id
        let loggedinUser = req.token.userId
        let user = await userModel.findOne({_id:userId})
        if(!user){
            return res.status(404).send({status:false,message:"no such user exist"})
        }
        if(loggedinUser !== userId){
            return res.status(403).send({status:false,message:"You are not authorized to perform this task"})
        }
        delete user._doc.codedPassword
        delete user._doc._id
        req.user = user
        next()
    }catch(error){
        return res.status(500).send({status:false,Error:error.message})
    }
}

module.exports = {authentication, authorization}