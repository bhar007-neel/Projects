const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin'
const jwtSecret = process.env.JWT_SECRET
/*
*  / check login
*/
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'unauthorized' })
    }
}


/*
* get / admin login page
*/


router.get('/admin', async (req, res) => {
    try {
        const locals = {
            title: "Admin Page",
            description: "simple blog created with Nodejs,Express and Mongodb"
        }

        // const data = await Post.find();
        res.render('admin/index', { locals, layout: adminLayout });
    } catch (error) {
        console.log(error)
    }
    //res.render('index',{locals}); // so instead of response we use render here becasue we want to display our content on the page, we use render in terms of web dev because that means we are creating or diplaying on a web page

})
// Post admin check login and check from the username that it exists there or not

router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" })

        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" })

        }

        // now we will save a token to a cookie

        const token = jwt.sign({ userId: user._id }, jwtSecret)
        res.cookie('token', token, { httpOnly: true })
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
    }

})


router.get('/dashboard', async (req, res) => {
    try {
        const locals = {
            title: "Admin Page",
            description: "simple blog created with Nodejs,Express and Mongodb"
        }
        const data = await Post.find();
        res.render('admin/dashboard',{
            locals,
            data
        })
    } catch (error) {
        console.log(error)
    }

});













// router.post('/admin', async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         if (req.body.username === 'admin' && req.body.password === 'password') {
//             res.send("you are logged in")

//         } else {
//             res.send("wrong username or password");
//         }
//     } catch (error) {
//         console.log(error);
//     }

// })

/**
 * POST/
 * admin check login
 */

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'user Created', user });

        } catch (error) {
            if (error.code = 11000) {
                res.status(409).json({ message: 'User already in use' })
            }
            res.status(500).json({ message: 'Internal server error' })
        }

    } catch (error) {
        console.log(error);

    }
});


/*
*
*/



module.exports = router;