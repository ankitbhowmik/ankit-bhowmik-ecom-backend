const express = require('express');
const router = express.Router();
const shopController = require('../controller/shopController');

router.get('/show-cart', shopController.showCart);

router.post('/add-to-cart', shopController.addToCart);

router.post('/remove-from-cart', shopController.removeFromCart);

module.exports = router;