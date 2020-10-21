const User = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const {getSignupErr, getLoginErr, createJwtToken, maxAgeInSec} = require('../actions/userAction');


module.exports.signUp_post = async (req, res)=>{
	const {name, email, password} = req.body;
	try{
		const newUser = await User.create({name, email, password});
		res.send({status:'success', email:newUser});
	}catch(err){
		const allError = getSignupErr(err);
		res.send({status:'fail', allError});
	}
}


module.exports.login_post = async (req, res)=>{
	const {email, password} = req.body;
	try{
		const oldUser = await User.login(email, password);
		const token = createJwtToken(oldUser._id, oldUser.email, oldUser.name);
		res.cookie('userAuth', token, {httpOnly:true, maxAge:maxAgeInSec()*1000})
		res.send({ 
				status:'success', user : {
								id:oldUser._id,
								email:oldUser.email,
								name:oldUser.name
							}  
				});
	}catch(err){
		const allError = getLoginErr(err);
		res.status(500).send({status:'fail', allError})
	}	
}


module.exports.logout = (req, res)=>{
	res.cookie('userAuth', '', {maxAge:1});
	res.send({status:'success'});
}


module.exports.verifyToken = (req, res)=>{
	const {userAuth} = req.cookies;
	if(userAuth){
		const user = jwt.verify(userAuth, process.env.SECRET_CODE, (err, decodedToken)=>{
			if(err){
				res.clearCookie('userAuth');
				res.send({status:'fail'});
			}else{
				res.send({status:"success", decodedToken});
			}
		})
	}else{
		res.send({status:'fail'});
	}
}