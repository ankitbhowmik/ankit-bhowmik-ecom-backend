const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	ProductTitle:{
		type:String,
		required:[true, 'please fill the title field']
	},
	ProductCategory:{
		type:String,
		required:[true, 'pleas fill product category']
	},
	ProductDescription:{
		type:String,
		required:[true, 'please fill the description field']
	},
	ProductModel:{
		type:String,
		default:"none"
	},
	ProductQty:{
		type:Number
	},
	ProductPrice:{
		type:Number,
		required:[true, 'please fill product Price']
	},
	ProductImage:[String]
})

module.exports = mongoose.model('product', productSchema);
