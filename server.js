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

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl:{
      rejectUnauthorized: false,
    }
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