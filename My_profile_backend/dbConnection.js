const mongoose = require('mongoose');
const mongooseUri = "mongodb://127.0.0.1:27017/My_profile";

//connection to mongodb
const connectTomongo = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(mongooseUri,() => {
        console.log(mongoose.connection.readyState+" connected");//0 not connect 1 connected
    })
}
module.exports= connectTomongo;