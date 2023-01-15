const userModel = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {
    isValidName,
    isValidEmail,
    isValidPhone,
    isValidPassword,} = require('../Validator/validator')

const register = async function(req,res){
    try{
        let {name,age,phone,email,password,designation} = req.body
        let obj = {}
        if(!name){
            return res.status(400).send({status:false,message:"Enter name"})
        }
        if(!isValidName(name)){
            return res.status(400).send({status:false,message:"Enter valid name"})
        }
        obj["name"] = name
        if(!age){
            return res.status(400).send({status:false,message:"Enter age"})
        }
        if(Number.isNaN(age)){
            return res.status(400).send({status:false,message:"Enter valid age"})
        }
        obj["age"] = age
        if(!phone){
            return res.status(400).send({status:false,message:"Enter phone number"})
        }
        if(!isValidPhone(phone)){
            return res.status(400).send({status:false,message:"Enter a valid phone"})
        }
        if(!email){
            return res.status(400).send({status:false,message:"Enter email"})
        }
        if(!isValidEmail(email)){
            return res.status(400).send({status:false,message:"Enter valid email"})
        }
        const isDuplicate = await userModel.findOne({$or:[{email:email},{phone:phone}]})
        if(isDuplicate){
            return res.status(409).send({status:false,message:"E-mail or phone number already in use"})
        }
        obj["email"] = email
        obj["phone"] = phone
        if(!designation){
            return res.status(400).send({status:false,message:"Enter Designation"})
        }
        if(!isValidName(designation)){
            return res.status(400).send({status:false,message:"Enter valid designation"})
        }
        obj["designation"] = designation
        if(!password){
            return res.status(400).send({status:false,message:"This is a required field"})
        }
        if(!isValidPassword(password)){
            return res.status(400).send({status:false,message:"This is a required field"})
        }
        obj["password"] = password
        let codedPassword = await bcrypt.hash(password,10)
        obj["codedPassword"] = codedPassword
        console.log(obj)
        let data = await userModel.create(obj)
        let token = jwt.sign(
            {
                userId: data._id.toString(),
                password: password
              },
              "rt647ysbwf$#@%&*ejm",
              { expiresIn: "24h" }
        )
        return res.status(200).send({status:true,userId:data._id,token:token})
    }catch(error){
        console.log(error)
        return res.status(500).send({status:false,Error:error.message})
    }
}

const login = async function(req,res){
    try{
        let {email, password} = req.body
        if(!email){
            return res.status(400).send({status:false,message:"Enter email"})
        }
        if(!isValidEmail(email)){
            return res.status(400).send({status:false,message:"Enter valid email"})
        }
        if(!password){
            return res.status(400).send({status:false,message:"Enter Password"})
        }
        let user = await userModel.findOne({email:email})
        if(!user){
            return res.status(404).send({status:false,message:"This email is not registered! Please SignUp"})
        }
        const match = await bcrypt.compare(password, user.codedPassword);
    if (!match) {
      return res
        .status(400)
        .send({ status: false, message: "Entered Passwrod is incorrect" });
    }
    let token = jwt.sign(
        {
            userId: user._id.toString(),
            password:user.password
        },              "rt647ysbwf$#@%&*ejm",
        { expiresIn: "24h" }
    )

    return res.status(201).send({status:true,userId:user._id,token:token})
    }catch(error){
        return res.status(500).send({status:false,Error:error.message})
    }
}

const getUser = async function(req,res){
    try{
        return res.status(200).send({status:true,data:req.user})
    }catch(error){
        return res.status(500).send({status:false,Error:message.error})
    }
}
module.exports = {register,login,getUser}