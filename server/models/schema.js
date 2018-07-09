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
    ProdName:String,
    ProdPrice:String,
    ProdDiscount:String,
    ProdImgName:String,
});

var CartSchema=mongoose.Schema({
    prodId:String,
    count:Number
})

var UserModel = mongoose.model('UsersCollection', UsersSchema);
var ProductsModel = mongoose.model('ProductsCollection',ProductsSchema);
var CartModel=mongoose.model("CartCollection",CartSchema);

module.exports = {
    UserModel: UserModel,
    ProductsModel:ProductsModel,
    CartModel:CartModel
}