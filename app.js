var express=require('express');//install express js
var bodyParser = require('body-parser');//body parser for post form data
var mongoose = require('mongoose');//mongoose db require
var Schema = mongoose.Schema; //mongoose schema
mongoose.Promise = require('bluebird');

var app=express();//expressjs initialization

app.set('view engine','ejs');//install template engine
app.use("/styles",express.static(__dirname + "/styles"));//include static files

//simple routing in express
app.get('/',function(req,res){	//home page
	 var title='Welcome to nodejs demo';
	res.render(__dirname+'/views/index',{data:'welcome to home page',title:title});
});

app.get('/about',function(req,res){	//about page
	res.render(__dirname+'/views/about',{data:'This is about page',title:'about'});
});

app.get('/profile',function(req,res){// profile
	res.render(__dirname+'/views/profile',{data:'This is profile page',title:'profile'});
});

app.get('/profile/:name',function(req,res){ //profile query string page
	//res.send('this is profile page'+req.params.name);
	res.sendFile(__dirname+'/profile');
});

app.get('/link1',function(req,res){	// link page
	res.render(__dirname+'/views/link1',{data:'This is link page',title:'link1'});
});

app.get('/link2',function(req,res){	
	res.render(__dirname+'/views/link2',{data:'This is link2 page',title:'link2'});
});

app.get('/link3',function(req,res){	
	res.render(__dirname+'/views/link3',{data:'This is link3 page',title:'link3'});
});

app.get('/contact',function(req,res){ //contact page
	res.render(__dirname+'/views/contact',{data:'This is contact page',title:'contact'});
});

// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
// POST /login gets urlencoded bodies 
app.post('/contact-success', urlencodedParser, function (req, res) {  
  if (!req.body) {//if not successfull
	return res.sendStatus(400);
  } else {
	//post request form data here	
	var data=req.body;
	
	//schema for table TestContact
	var schemaName = new Schema({
		fname:String,
		email:String,
		phone:Number,
		url:String,
		message:String
	});
	var TestContact = mongoose.model('TestContact', schemaName);//create table with schema TestContact
	mongoose.connect('mongodb://test:test@ds133932.mlab.com:33932/mongotest');//connect to mongodb of https://mlab.com/	
	TestContact(data).save(function(err){
		if(err) throw err;
		console.log('item saved');
	});
	
	//now reder the contact success page.
	res.render(__dirname+'/views/contact-success',{contactdata:data,title:'contact us success!'});
  }
});


//Server listen to localhost in this port number
app.listen(8080);