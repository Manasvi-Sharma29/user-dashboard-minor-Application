const express = require('express')
const route = require('./Routes/route')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())


mongoose.connect(
    "mongodb+srv://Manasvi29:bharat2909@cluster0.r7a9dpa.mongodb.net/user-Dashboard-DB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
).then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err))


app.use('/',route)
app.listen(process.env.PORT || 3000, function(){
    console.log("Express app running on port " + (process.env.PORT || 3000))
})


