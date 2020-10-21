const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcryptjs');


const cartSchema = mongoose.Schema({
	productId: {
		type:String,
		required:[true, 'productId is required']
	},
	productName:String,
	productQty: {
		type:String,
		default:1
	},
	proudctBought: {
		type:Boolean,
		default:false
	},
	productPrice: String,
	productImg:String
})


const userSchema = mongoose.Schema({
	name:{
		type:String,
		required:[true, 'name is not entered']
	},
	email:{
		type:String,
		required:[true, 'email is not entered'],
		unique:true,
		lowerCase:true,
		validate:[isEmail, 'this is not a valid email']
	},
	password:{
		type:String,
		required:[true, 'password is required'],
		validate: [function(pass){ return pass.length > 5 }, "password should be at least 5 character"]
	},
	cart:[cartSchema]
})


userSchema.pre('save', async function(next){
	// if this line is not added it will create new password every 
	//time the document is saved for a particular user 
	//i.e for adding data to subdocument
	if (!this.isModified('password')) return next();

	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
})

userSchema.statics.login = async function (email, password){
	const someUser = await this.findOne({email});
	if(someUser){
		const matchPassword = await bcrypt.compare(password, someUser.password);
		if(matchPassword){
			return someUser;
		}else{
			throw Error("Incorrect Password");
		}
	}else{ 
		throw Error("Incorrect Email");
	}
}

module.exports = mongoose.model('user', userSchema);