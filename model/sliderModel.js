const mongoose = require('mongoose');

const sliderSchema = mongoose.Schema({
		SliderImage:{type:String, required:[true, 'please insert a image']}
})

module.exports = mongoose.model('slider', sliderSchema);