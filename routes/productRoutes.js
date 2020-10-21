const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const {upload} = require('../middleware/productMiddleware');


// product routes
router.get('/', productController.index);
router.post('/', upload.array('ProductImage', 10) , productController.store);
router.get('/one/:id', productController.getOne);
router.get('/category/:category', productController.getByCategory);
router.get('/productList/:searchKey?', productController.searchProduct);

// products error handler
router.use('/', (err, req, res, next)=>{
	res.status(420).send({status:'fail', message:err.message ,allError:err});
})

module.exports = router;