const mongoose = require('mongoose');

function connectDB() {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-ggtto.mongodb.net/test?retryWrites=true&w=majority`;
    mongoose.connect(uri, {useNewUrlParser: true});
    return uri;
}

module.exports = { connectDB }