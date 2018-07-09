var express = require('express');
var multer  = require('multer');
const uuidv4=require('uuidv4');
const path=require('path');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/productImages')
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + path.extname(file.originalname)) 
    }
  })
var upload = multer({ storage: storage });
  
// custom
var Module = require('../modules/modules');

var openRouter = express.Router();
var authRouter = express.Router();

// openRouter.post('/profile', upload.single('MyFile'), function (req, res) {
   
//     console.log('File is ==>', req.file);
//     console.log('Body is ==>', req.body);

//     Module.SaveProducts(req,function(result){
//         res.json(result);
//     })
// })

openRouter.get('/getimage',function(req,res){
    res.sendFile(__dirname+"/uploads/1527064786601.jpg");
})


openRouter.post('/register', function (req, res) {
    Module.Register(req.body, function (result) {
        res.json(result);
    });
});

openRouter.post('/login',function(req,res){
    
    Module.LoginVerify(req.body,function(result){
        res.json(result);
    })
})

authRouter.post('/products',upload.single('key'),function(req,res){
    
    Module.SaveProdDetails(req,function(result){
        res.json(result);
    })
})

authRouter.get('/products',function(req,res){
    Module.GetProducts(function(result){
        res.json(result);
    })
})

authRouter.get('/products/images/:imageName',function(req,res){
    res.sendFile(__dirname.replace('/server/routes','')+'/uploads/productImages/'+req.params.imageName);
})

authRouter.post('/productid',function(req,res){
    Module.AddToCart(req,function(result){
        res.json(result);
    })
})

authRouter.get('/cart',function(req,res){
    Module.GetCart(function(result){
        res.json(result);
    })
})

authRouter.get('/cartlist',function(req,res){
    Module.GetCartList(function(result){
        res.json(result);
    })
})

// openRouter.post('/loginVerify', function (req, res) {
//     User.loginVerify(req.body, function (result) {
//         res.json(result);
//     })
// })

// openRouter.get('/getAllUsers',function(req,res){
//     User.getAllUsers(function(result){
//         res.json(result);
//     })
// })

// openRouter.get('/getAllUsers/:email/:password',function(req,res){
//     console.log("details=====>",req.params);
//     User.getSelectedUser(req.params,function(result){
//         res.json(result);
//     })
// })

// openRouter.post('/uploadSingle',upload.single('sashi'),function(req,res){
//     console.log("i am here ============")
//     User.uploadSingle(req,function(result){
//         res.json(result);
//     })
// })

// openRouter.get('/ravi', function (req, res) {
//     fs.ReadStream('./uploads/a8647a54764114684d6728309bdc0483',function(err, data){
//         if (err){
//            console.log(err); 
//         }
//         console.log(data.ReadStream);
//         res.end(data);
//       });
    

//     });
module.exports = {
    openRouter: openRouter,
    authRouter:authRouter
}

