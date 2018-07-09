var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');



// custom
var Model = require('../models/schema');
var config = require('../config/config');
var helpers = require('../helpers/helpers');

var User = function () {
}

User.prototype.Register = function (cred, callback) {
    var retObj = {};
    var user = new Model.UserModel({
        userName: cred.userName,
        password: helpers.getmd5(cred.password),
        email: cred.email,
        contact: cred.contact,
        role: cred.role
    })
    user.save(function (err) {
        if (err) {
            retObj.status = false;
            retObj.message = "Error while saving the credentials";
            retObj.error = err;
            callback(retObj);
        } else {
            retObj.status = true;
            retObj.message = "Your details successfully saved in database";
            callback(retObj);
        }
    })
}

User.prototype.LoginVerify = function (cred, callback) {
    var retObj = {};
    Model.UserModel.findOne({ email: cred.email }, function (err, user) {
        if (err) {
            retObj.status = false;
            retObj.message = "Error while getting credentials";
            callback(retObj);
        } else if (user && user.password === helpers.getmd5(cred.password)) {
            retObj.status = true;
            retObj.message = "You are successfully logged in";
            retObj.token = jwt.sign({ id: user._id }, config.jwt.secret, config.jwt.options);
            retObj.role = user.role;
            callback(retObj);
        } else {
            retObj.status = false;
            retObj.message = "Invalid credentials";
            callback(retObj);
        }
    })
}

User.prototype.SaveProdDetails=function(details,callback){
    var retObj={};
    var product = new Model.ProductsModel({
        ProdName: details.body.proName,
        ProdPrice:details.body.proPrice,
        ProdDiscount:details.body.proDiscount,
        ProdImgName:details.file.filename
    })
    product.save(function(err){
        if (err) {
            retObj.status = false;
            retObj.message = "Error while saving the credentials";
            retObj.error = err;
            callback(retObj);
        } else {
            retObj.status = true;
            retObj.message = "Product details successfully saved in database";
            callback(retObj);
        }
    })
}

User.prototype.GetProducts=function(callback){
    var retObj={};
    Model.ProductsModel.find(function(err,docs){
        if(err){
            retObj.status=false;
            retObj.message="Error while getting products data";
            callback(retObj);
        }else{
            retObj.status=true;
            retObj.message="Successfully got the products data";
            retObj.data=docs;
            callback(retObj);
        }
    })
}

User.prototype.AddToCart=function(data,callback){
    var retObj={};
    console.log("-------------------",data.body.ProductId)
    ProductIdTosave=new Model.CartModel({
        prodId:data.body.ProductId,
        count:1
    })
    ProductIdTosave.save(function(err){
        if (err) {
            retObj.status = false;
            retObj.message = "Error while saving the product id";
            retObj.error = err;
            callback(retObj);
        } else {
            retObj.status = true;
            retObj.message = "Product id is saved successfully in database";
            callback(retObj);
        }
    })
}

User.prototype.GetCart=function(callback){
    var retObj={};
    Model.CartModel.find(function(err,docs){
        if(err){
            retObj.status=false;
            retObj.message="Error while getting cart data";
            callback(retObj);
        }else{
            retObj.status=true;
            retObj.message="Successfully got the cart data";
            retObj.data=docs;
            callback(retObj);
        }
    })
}

User.prototype.GetCartList=function(callback){
    var retObj={};
    Model.CartModel.find(function(err,docs){
        if(err){
            retObj.status=false;
            retObj.message="Error while getting cart data";
            callback(retObj);
        }else{
            var productIds=[];
            for(var i=0;i<docs.length;i++){
                productIds.push(docs[i].prodId);
             }
             Model.ProductsModel.find({"_id" : {"$in" : productIds}},function(err,productsData){
                if(err){
                    retObj.status=false;
                    retObj.message="Error while getting cart list data";
                    callback(retObj);
                }else{
                    retObj.status=true;
                    retObj.message="Successfully got the cart list data";
                    retObj.data=productsData;
                    callback(retObj);
                }
             })
        }
    })
}
// fun.prototype.getAllUsers = function (callback) {
//     var retObj = {};
//     user.userModel.find(function (err, docs) {
//         if (err) {
//             retObj.status = false;
//             retObj.message = "Error while getting user details";
//             callback(retObj);
//         } else {
//             retObj.status = true;
//             retObj.message = "Successfully got the user details";
//             retObj.data = docs;
//             callback(retObj);
//         }
//     })
// }

// fun.prototype.getSelectedUser = function (cred, callback) {
//     var retObj = {};
//     user.userModel.findOne({ email: cred.email }, function (err, userDetails) {
//         if (err) {
//             retObj.status = false;
//             retObj.message = "Error while getting credentials";
//             callback(retObj);
//         } else if (userDetails && userDetails.password === cred.password) {
//             retObj.status = true;
//             retObj.message = "Selected user details";
//             retObj.data=userDetails;
//             callback(retObj);
//         } else {
//             retObj.status = false;
//             retObj.message = "Invalid credentials";
//             callback(retObj);
//         }
//     })
// }

// fun.prototype.uploadSingle=function(req,callback){
//     console.log("here in req . file is ====>",req.file);
//     callback("record inserted");
// }


module.exports = new User();