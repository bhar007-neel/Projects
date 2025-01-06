const express =require('express') // have to import the express again
const router =express.Router(); // using router with express
const Post =require('../models/Post');



/**
 * GET /
 * HOME
 */



// response to server
router.get('',(req,res)=> {
    const locals={
        title:"NodeJs Blog",
        description: "simple blog created with Nodejs,Express and Mongodb"
    }
    res.render('index',{locals}); // so instead of response we use render here becasue we want to display our content on the page, we use render in terms of web dev because that means we are creating or diplaying on a web page

})





// creating an another route
router.get('/about',(req,res)=>{
    res.render('about')
})
module.exports= router; // exporting our response from router