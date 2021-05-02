require('dotenv').config();

const express = require('express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var request = require('request')
var cors = require('cors')
var url = require('url');
const app = express();
app.use(cors());
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { getNodeText } = require('@testing-library/dom');


// use it before all route definitions
app.use('/api', function(req, res) {
    var url = apiUrl + req.url;
    req.pipe(request(url)).pipe(res);
  });
  

//later on put this in database;
const users = [];

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {

    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(salt);
        console.log(hashedPassword);
        const user = { name: req.body.name, password: hashedPassword };
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send()
    }


    //hash(salt + 'password')
    //hash(salt2 + 'password')  // salt is different for every single user, so even if they have
    //identical passwords (and so hash would be the same), salt makes them different and database - safer 
})


//compare if password matches saved password
app.post('/users/login', async (req, res) => {
    //AUTHENTICATE USER
    const user = users.find(user => user.name === req.body.name);
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            // this will hash the input password and compare to hashed password in database
            // if true - passwords the same and user logged in 
            // bcrypt.compare function prevents from timing attacks
            res.send('Success');
            //SHOULD PUT TOKEN AUTHORIZATION HERE
        } else {
            res.send('Not allowed')
        }
    } catch {
        res.status(500).send()
    }
})

const posts = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
    {
        username: 'Jim',
        title: 'Post 2'
    }
]

app.post('/login', jsonParser, async (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const user = { name: username };
    //jwt.sign(payload, secret) arguments:
    //payload - what we want to serialize - so the user object
    //secret key - secret value taken from .env file
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken })
})

app.get('/posts', authenticateToken, (req, res) => {
    //only get those posts to which the user has access
    var parts = url.parse(req.url, true);
    var query = parts.query;
    res.json(posts.filter(post => post.username === query.username));
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    //if we have an authHeader then return the actual token, otherwise return undefined;
    //authHeader.split(' ')[1] takes the second argument of "Bearer TOKEN", which is TOKEN after space
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return (res.sendStatus(401))

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); //meaning you have a token but it's no longer valid, so no access
        req.user = user;
        next();
    })
}

app.listen(3100);