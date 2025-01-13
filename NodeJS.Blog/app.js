require('dotenv').config() //loading our environment variavbles from .env file to store sensitive information
const express = require('express');
const expressLayout = require('express-ejs-layouts') // this is the middleware helps to manage EJS (embedded javascript template),it simpifies the process of creating  layout files and allowing use to avoid repeating common Html mistakes
const methodOverride = require('method-override')
const connectDB =require('./server/config/db')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo')


const app = express();
const PORT =5000 || process.env.PORT;
app.use(express.static('public'));  // telling to use public folder for our application

//to search data in our search bar
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // while searching we will be passing our data in this form
//conect db

connectDB();
app.use(methodOverride("_method"));
// Adding a middleware for a cookie parser
app.use(cookieParser());
app.use(session({
    secret:  'keyboard cat',
    resave: false,
    saveUnintialized: true,

    store: MongoStore.create({
        mongoUrl: process.env.MONOGODB_URI
    }),
    // cookie: {maxAge: new Date (Date.now() + (3600000))}
    // date.now() - 30 * 24 * 60 * 60 *1000
}))
//Templating ENGINE // Midddleware
app.use(expressLayout); // now we are using the EJS AS we imported it before
app.set('layout','./layouts/main');//This line sets the default layout file to ./layouts/main.ejs. This means that any rendered view will be embedded within this main layout unless specified otherwise

app.set('view engine','ejs') //Here, we are setting EJS as the templating engine for your Express app. EJS allows you to create HTML templates with embedded JavaScript, which can dynamically render data passed from your server.

app.use('/',(require('./server/routes/main'))) // if we have a get request for our website for home page it tell it to require from the mentioned path

app.use('/',(require('./server/routes/admin')))

app.listen(PORT,()=>{
    console.log(`App is listening on Port ${PORT}`)
})