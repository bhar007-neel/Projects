const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin'


router.get('/admin',async (req, res) => {
    try {
    const locals = {
        title: "Admin Page",
        description: "simple blog created with Nodejs,Express and Mongodb"
    }

        // const data = await Post.find();
        res.render('admin/index',{locals,layout: adminLayout});
    } catch (error) {
        console.log(error)
    }
    //res.render('index',{locals}); // so instead of response we use render here becasue we want to display our content on the page, we use render in terms of web dev because that means we are creating or diplaying on a web page

})

/**
 * POST/
 * admin check login
 */

router.post('/register', async (req, res) => {
    try {
        const { username, password}  = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try{
            const user = await User.create({username, password:hashedPassword });
            res.status(201).json({message: 'user Created', user});

        }catch(error){
            if(error.code = 11000){
                res.status(409).json({message : 'User already in use'})
            }
            res.status(500).json({message: 'Internal server error'})
        }
    
    } catch (error) {
        console.log(error);

    }
});


/*
*
*/



module.exports = router;