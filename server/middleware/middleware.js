var jwt = require('jsonwebtoken');

var config = require('../config/config')

function authMiddleware(req, res, next) {
	var token = req.headers.token;//????????????
	var retObj = {};


	if (!token) {
		// send not authorized
		retObj.status = false;
		retObj.statusCode = 403;
		retObj.message = 'Not Authorized'
		res.json(retObj);
	} else {
		jwt.verify(token, config.jwt.secret, function (err, decodedToken) {
			if (err) {
				retObj.status = false;
				retObj.statusCode = 403;
				retObj.message = 'Not Authorized'
				res.json(retObj);
			} else {
				console.log("============>>>>>>>>>",err);
				console.log("################",decodedToken);
				next();
			}

		});
	}

};

module.exports = {
	authMiddleware:authMiddleware
};