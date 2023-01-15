const express = require('express')
const {register,login,getUser} = require('../Controller/userController')
const {authentication,authorization} = require('../Middleware/auth')
const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/profile/:id',authentication,authorization,getUser)


module.exports = router