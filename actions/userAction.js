const jwt = require('jsonwebtoken');

module.exports.getSignupErr = (err) => {
	let allError = {};
	if(err.code && err.code === 11000)
	{
		allError.email = 'This email is already taken by someone';
	}
	if(err.message && err.message.includes('validation failed')){
		Object.entries(err.errors).forEach(([key, val])=>{
			allError[key] = val.message ;
		})
	}
	return allError;
}

module.exports.getLoginErr = (err) => {
	let allError = {};
	if(err.message === "Incorrect Email"){
		allError.email = err.message;
	}
	if(err.message === "Incorrect Password"){
		allError.password = err.message;
	}
	return allError;
}

const maxAgeInSec = ()=>{
	// 4 days in second
	return 60*60*24*4;
} 
module.exports.maxAgeInSec = maxAgeInSec;

module.exports.createJwtToken = (id, email, name)=>{
	return jwt.sign({id, email, name}, process.env.SECRET_CODE, {expiresIn: maxAgeInSec()})
}

module.exports.getUserId = (jwtCookie)=>{
	if(jwtCookie){
		const userId = jwt.verify(jwtCookie, process.env.SECRET_CODE, (err, decodedToken)=>{
			if(err){
				return false;
			}else{
				return decodedToken.id;
			}
		})
		if(userId){
			return userId;
		}
	}else{
		return false;
	}
}


