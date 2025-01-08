const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

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



module.exports = router;