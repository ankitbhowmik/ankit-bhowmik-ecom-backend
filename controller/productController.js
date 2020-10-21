const Product = require('../model/productModel');
const {handleCreateError} = require('../actions/dbAction');


module.exports.store = async (req, res)=>{
	const {ProductTitle, ProductCategory, ProductDescription, ProductModel, ProductQty, ProductPrice} = req.body;
	
	if(req.files === undefined){
		res.status(300).send({status:'fail', allError:{ProductImage:'this is required'}});
		return;
	}

	try{
		const ProductImage = req.files.map(file=> file.filename)
		const success = await Product.create({ProductTitle, ProductCategory, ProductDescription, ProductModel, ProductQty, ProductPrice, ProductImage});
		res.send({status:'success'});
	}catch(err){
		console.log(err);
		const allError = handleCreateError(err);
		res.status(500).send({status:'fail', allError, message:err.message});
	}
}


module.exports.index = async (req, res)=>{
	const category = ['Mobile', 'Laptop', 'tablet' , 'Accessories'];
	res.render('createProducts', {category});
}


module.exports.getOne = async (req, res)=>{
	const productId = req.params.id;
	try{
		const singleProduct = await Product.findById(productId);
		res.send({Product:singleProduct, imagePath:'/productImages/'});
	}catch(err){
		res.status(500).send({message:'no product found with this id'});
	}
}


module.exports.getByCategory = async (req, res)=>{
	const ProductCategory = req.params.category;
	try{
		const manyProduct = await Product.find({ProductCategory}).limit(4).sort({_id:-1});
		res.send({products: manyProduct, imagePath:'/productImages/'});
	}catch(err){
		res.status(500).send({message:'no product found with this id'});
	}
}


module.exports.searchProduct = async (req, res)=>{
	let {searchKey} = req.params;
	const allProducts = await Product.find({ProductModel: new RegExp(searchKey, 'i') }).limit(10);
	res.send({Products:allProducts, imagePath:'/productImages/'});
}
