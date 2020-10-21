const multer = require('multer');
const validator = require('validator');

const storage = multer.diskStorage({
	destination:function(req, file, cb){
		cb(null , './public/productImages');
	},
	filename:function(req, file, cb){
		cb(null, new Date().toISOString().replace(/:/g, '-') + 'randomstring' +file.originalname);
	}
})
const fileFilter = function(req, file, cb){
	if(file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png")
		cb(null, true);
	else
		cb(new Error("only jpeg or png is accepted"), false);
}
const limits = {fileSize: 1e6}		// in bytes
const upload = multer({storage, limits, fileFilter});


module.exports = {upload}