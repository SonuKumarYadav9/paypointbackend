const express = require('express')
const mongoose = require("mongoose")
const route= require("./src/routes/route")
const multer = require('multer')
const cors = require('cors')

require("dotenv").config()

const app = express()

//Global MIDDLEWARES

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(multer().any())
app.use(express.json())


mongoose.connect(process.env.D_B,{
    useNewUrlParser: true
})
.then(()=>console.log("Connected to Database"))
.catch((e)=>console.log(e))

app.use("/", route)

app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}!`))

