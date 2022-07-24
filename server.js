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
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'test',
    database : 'smartbrain'
  }
});




app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // "*" means allow connection from any request url.
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/signin', (req,res)=>signin.handleSignin(req, res, db, bcrypt));

app.post('/register',(req,res)=>register.handleRegister(req, res, db, bcrypt));

app.get('/profile/:id',(req,res)=>profile.handleProfile(req, res, db));

app.put('/image',(req,res)=>image.getImage(req, res, db) )

app.listen(process.env.PORT || 3000, ()=>{

  console.log(`app running on ${process.env.PORT}`);
})