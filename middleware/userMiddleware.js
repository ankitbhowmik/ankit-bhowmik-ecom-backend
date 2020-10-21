module.exports.verifyToken = (req, res, next)=>{
	const {userAuth} = req.cookies;
	if(userAuth){
		const user = jwt.verify(userAuth, process.env.SECRET_CODE, (err, decodedToken)=>{
			if(err){
				res.send({status:'wrongJwt'});
			}else{
				next();
			}
		})
	}else{
		res.send({status:'wrongJwt'})
	}
}