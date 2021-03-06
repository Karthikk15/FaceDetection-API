const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const userProfile = require('./Controllers/userProfile');
const updateEntries = require('./Controllers/updateEntries');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
//Database connection.
 const dataBase= knex({
    client: 'pg',
   connection: {
     connectionString: process.env.DATABASE_URL,
     ssl: true
   }
  });

const app = express();
app.use(cors());
app.use(bodyParser.json()); 

app.get('/',(req, res) => {
res.json('Success!')
})
//Handling SignIn
app.post('/signin', (req, res) => signin.handleSignIn(req, res, dataBase, bcrypt))
//Handling Register
app.post('/register',(req ,res) => register.handleRegister(req, res, dataBase, bcrypt))
// Retrieve User profile based on ID
app.get('/profile/:id', (req, res) => userProfile.handleUserProfile(req, res, dataBase))
// To Update entries
app.put('/image', (req, res) => updateEntries.handleEntries(req , res, dataBase));

app.post('/imageUrl', (req, res) => updateEntries.handleImageURL(req , res));

app.listen(process.env.PORT || 3001);

/*
root - get - Success
/signin - post - Success
/register - post - Success
/profile/:id - get - User
/image - put - update entries
*/