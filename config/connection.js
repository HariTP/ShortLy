const mongoose = require('mongoose');

const connectDB = async (URL) => {
    await mongoose.connect(URL)
    .then(() => {
        console.log("DB connected :)");
    })
    .catch((error) => {
        console.log("DB connection error:\n\n ", err);
    })   
}

module.exports = connectDB;