var mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://localhost/organicsDB');
var db = mongoose.connection;

db.on('error', function (err) {
    console.log("ERROR CONNECTING TO DATABASE", err);
})

db.once('open', function callback() {
    console.log('CONNECTED TO MONGODB');
});

var UsersSchema = mongoose.Schema({
    userName: String,
    password: String,
    email: String,
    contact: String,
    role:String
});

var ProductsSchema= mongoose.Schema({
    name:String,
    fileName:String
});

var UserModel = mongoose.model('UsersCollection', UsersSchema);
var ProductsModel = mongoose.model('ProductsCollection',ProductsSchema);

module.exports = {
    UserModel: UserModel,
    ProductsModel:ProductsModel
}