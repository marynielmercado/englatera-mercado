const express = require('express');
const path = require('path');
const aws = require('aws-sdk');
const searches = require('./models/searches');
const { Client } = require('pg');
//const bootstrap = require('bootstrap');
const exphbs = require('express-handlebars');
// instantiate client using your DB configurations
const client = new Client({
	database: 'KART ENGLATERA',
	user: 'postgres',
	password: 'engrkye19',
	host: 'localhost',
	port: 5432
});

// connect to database
client.connect()
	.then(function() {
		console.log('connected to database!')
	})
	.catch(function(err) {
		console.log('cannot connect to database!')
	});

const app = express();
// tell express which folder is a static/public folder
app.use(express.static(path.join(__dirname, 'public')));
//
app.engine('handlebars',exphbs ({defaultlayout:'main'}));
app.set('view engine','handlebars');

app.get('/', function(req, res) {
	res.send('Hello Express!!!');
});

app.get('/home', function(req, res) {
	res.render('home', {
		title: 'PROFILE INFORMATION',
imageurl1:'/2x2 final.jpg',
imageurl2:'/mee.jpg',

});
	});

app.get('/api/products', function(req, res) {

	client.query('SELECT * FROM Products', (req, data)=>{
		console.log(data.rows);
		res.json({
			data: data.rows
		})
	})
});
app.get('/products', function(req, res) {
	res.render('products',{ 
		title:'Product List',
		category:'My Store'

	});
});

app.get('/member/1',function(req,res){
	res.render('member',{
		title: 'About Me',
		name: 'Kart Y. Englatera',
		email: 'kart.englatera08@gmail.com',
		phone: '09557934534',
		imageurl:'/2x2 final.jpg',
		hobbies: ['tutoring','eating']
	});
});		

app.get('/member/2',function(req,res){
	res.render('member',{
		title: 'About Me',		
		name: 'Maryniel S. Mercado',
		email: 'maryniel24@gmail.com',
		phone: '09338132264',
		imageurl:'/mee.jpg',
		hobbies: ['eating','sleeping']
	});
});		


app.listen(3000, function() {
	console.log('Server started at port 3000');
});