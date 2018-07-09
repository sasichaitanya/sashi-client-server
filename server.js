var express= require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors')

// custom imports
var routes=require('./server/routes/routes');
var authMiddle = require('./server/middleware/middleware');


var app=express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(cors());
app.use('/api',routes.openRouter);
// app.use(authMiddle.authMiddleware);
app.use('/api',routes.authRouter);

app.listen(7070,function(err){
    if(!err){
        console.log("Server running on port 6060");
    }
});