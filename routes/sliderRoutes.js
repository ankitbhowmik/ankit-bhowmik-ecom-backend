const express = require('express');
const router = express.Router();
const Slider = require('../model/sliderModel');

// multer middleware starts
const multer = require('multer');
const storage = multer.diskStorage({
	destination:function(req, file, cb){
		cb(null, './public/slidersImages/')
	},
	filename:function(req, file, cb){
		cb(null, file.originalname)
	}
})
const limits = {fileSize:2e6}
const upload = multer({storage, limits});
//multer middleware ends

router.get('/', async (req, res)=>{
	try{
		const allSliders = await Slider.find();
		res.send({allSliders, path:'/slidersImages/'});
	}catch(err){
		res.send({status:'fail', message:err.message});
	}
});

router.post('/', upload.single('SliderImage'), async(req, res)=>{
	try{
		const SliderImage = req.file.originalname;
		const newSlider = await Slider.create({SliderImage});
		res.send({status:'success'});
	}catch(err){
		console.log(err);
		res.send({status:'fail', message:'wrong input given'});
	}
})

module.exports = router;