const express = require('express');
const bodyParser=require('body-parser');
var bcrypt = require('bcryptjs');
var cors = require('cors');
var signin= require('./controllers/signin');
var register= require('./controllers/register');
var image= require('./controllers/image');
var profile= require('./controllers/profile');
var knex = require('knex')({
  client: 'pg',
  connection: {
	connectionString: process.env.DATABASE_URL,
  	ssl: {
	    rejectUnauthorized: false
	  }
  }
});

const app=express();

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => { res.send("It is working")})

app.post('/signin', (req, res) => {	signin.handlesignin(req, res, bcrypt, knex)})

app.post('/register', (req, res) => {register.handleregister(req, res, bcrypt, knex)})

app.get('/profile/:id', (req,res) => {profile.handleprofile(req, res, knex)})

app.put('/image', (req,res) => {image.handleimage(req,res, knex)})

app.post('/imagedetect', (req,res) => {image.handleFaceDetect(req,res)})

app.listen(process.env.PORT || 3000, () => {console.log(`The server is running on port ${process.env.PORT}`)})
