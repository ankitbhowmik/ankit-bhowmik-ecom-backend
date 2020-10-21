const User = require('../model/UserModel');
const Product = require('../model/productModel');

const {getUserId} = require('../actions/userAction');


module.exports.showCart = async (req, res)=>{
	const userId = getUserId(req.cookies.userAuth);
	if(!userId){
		res.send({status:'fail', error:'not logged in'})
		return;
	}
	const user = await User.findById(userId).select('cart');
	res.send(user.cart);
}


module.exports.addToCart = async (req, res)=>{
	const {productId} = req.body;
	let productQty = req.body.productQty || 1;

	const userId = getUserId(req.cookies.userAuth);
	if(!userId){
		res.send({status:'fail', error:'not logged in'})
		return;
	}

	try{
		const user = await User.findById(userId);
		const dublicate = user.cart.some(item=> (item.productId === productId) );
		if(dublicate){
			res.send({status:'fail', error:'item already exist in cart'});
			return;
		}

		const product = await Product.findById(productId).select('ProductTitle ProductPrice ProductImage');
		if(product){
			const productPrice = product.ProductPrice * productQty;
			const productName = product.ProductTitle;
			const productImg = product.ProductImage[0];
			user.cart.push({productId, productQty, productPrice, productName, productImg});
			user.save(function(err){
				if(err) 
					res.status(300).send({status:'fail', error:'save'})
				else
					res.send({status:'success'})
			})
		}else{
			res.status(300).send({status:'fail', error:'else'})
		}

	}catch(err){
		res.status(300).send({status:'fail', error:'catch'})
	}
}


module.exports.removeFromCart = async (req, res)=>{
	const {productId} = req.body;
	const userId = getUserId(req.cookies.userAuth);
	if(!userId){
		res.send({status:'fail', error:'not logged in'})
		return;
	}

	const user = await User.findById(userId);
	user.cart = user.cart.filter(item => (item.productId !== productId) )
	user.save(function(err){
		if(err){
			res.send({status:'fail', error:'some error in db'});
		}else{
			res.send({status:'success'})
		}
	})

}