const mongoose = require("mongoose")

const url = "mongodb://Shush:shush129@ac-1zsaov0-shard-00-00.4ismyhv.mongodb.net:27017,ac-1zsaov0-shard-00-01.4ismyhv.mongodb.net:27017,ac-1zsaov0-shard-00-02.4ismyhv.mongodb.net:27017/?ssl=true&replicaSet=atlas-w1rvdu-shard-0&authSource=admin&retryWrites=true&w=majority"


module.exports.connect = () => {
    mongoose.connect(url).then((res)=> console.log("MongoDB is connected successfully")).
    catch((err)=> console.log("Error: ", err))
}