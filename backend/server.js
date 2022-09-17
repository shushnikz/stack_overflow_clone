const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const { request, response } = require("express");
const db = require("./db");
const PORT = process.env.PORT || 80
const router = require("./routers")
// db collection

db.connect();



// middleware
app.use(bodyParser.json({ limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}));

app.use(express.json())

// header
app.use((request,response,next)=>{
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "*");
  next();
})

// api

app.use('/api', router)

// static resources

app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));

app.get("*",(request, response)=>{
    try{
        response.sendFile(path.join(`${__dirname}/../frontend/build/index.html`))
    } catch (e) {
        response.send("oops! error occured")
    }
   
})

// cors
app.use(cors())

// server listen
app.listen(PORT, () => {
    console.log(`Stack Overflow Clone API is running on PORT No- ${PORT}`);
})