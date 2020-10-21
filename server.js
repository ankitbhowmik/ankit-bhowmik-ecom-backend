require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const port = process.env.PORT;
//mongoose config
mongoose.connect(process.env.MONGODB_URI, {
	useUnifiedTopology:true,
	useCreateIndex:true,
	useNewUrlParser:true
	})
	.then(result=>{
		console.log('mongodb connected');
		//listener
		app.listen(port, ()=>console.log('server running at port ',port));
	})
	.catch(err=>console.log(err.message))


//middleware
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cookieParser());
app.use(express.static('public'));



//Route
app.use('/product', require('./routes/productRoutes'));
app.use('/slider', require('./routes/sliderRoutes'));
app.use('/user', require('./routes/userRoutes'));
app.use('/shop', require('./routes/shopRoutes'));


//404 route error
app.use((req, res, next)=>{
	res.status(404).send('404 not found');
})
//error handler
app.use((err, req, res, next)=>{
	console.log(err.stack);
	res.status(500).send('something broke');
})
