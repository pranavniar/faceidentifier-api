const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : 'ec2-44-206-214-233.compute-1.amazonaws.com',
    port : 5432,
    user : 'wxcjksjonnjwuy',
    password : 'fccd97d22ce7479ab2fa12e630ca0b958ae99169186cfc1e1356f1bb52e9477c',
    database : 'd5t9e1uaahk74s'
  }
});




app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // "*" means allow connection from any request url.
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/',(req,res)=>{res.send('it is working')});

app.post('/signin', (req,res)=>signin.handleSignin(req, res, db, bcrypt));

app.post('/register',(req,res)=>register.handleRegister(req, res, db, bcrypt));

app.get('/profile/:id',(req,res)=>profile.handleProfile(req, res, db));

app.put('/image',(req,res)=>image.getImage(req, res, db) )

app.listen(process.env.PORT || 3000, ()=>{

  console.log(`app running on ${process.env.PORT}`);
})