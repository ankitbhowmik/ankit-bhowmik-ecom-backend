module.exports.handleCreateError = (err)=>{
	let allError = {};

	if(err.message.includes('validation failed')){
		Object.entries(err.errors).forEach(([key, val])=>{
			allError[key] = val.message;
		})
	}

	return allError;
}
