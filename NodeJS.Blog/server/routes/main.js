const express = require('express') // have to import the express again
const router = express.Router(); // using router with express
const Post = require('../models/Post');



/**
 * GET /
 * HOME
 */

// so we are declaring our home route here

router.get('', async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let perPage = 6;
    let page = req.query.page || 1;   // basically we setting up  a page query that says we have more page then we can access it otherwise if not more than one page availabe then only one


    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    // Count is deprecated - please use countDocuments
    // const count = await Post.count();
    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});


// this code is also valid for a home route but we declared pagination in our code therfore we used that  
// // response to server
// router.get('',async (req, res) => {
//     const locals = {
//         title: "NodeJs Blog",
//         description: "simple blog created with Nodejs,Express and Mongodb"
//     }
//     try {
//         const data = await Post.find();
//         res.render('index',{locals,data});
//     } catch (error) {
//         console.log(error)
//     }
//     //res.render('index',{locals}); // so instead of response we use render here becasue we want to display our content on the page, we use render in terms of web dev because that means we are creating or diplaying on a web page

// })









// creating an another route, we are rendering our home page here
router.get('/about', (req, res) => {
  res.render('about')
})
module.exports = router; // exporting our response from router

/*
*GET/
* POST:id
*/

router.get('/post/:id', async (req, res) => {
  try {

    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "simple blog created with Nodejs,Express and Mongodb"
    }

    res.render('post', { locals, data });
  } catch (error) {
    console.log(error)
  }
  //res.render('index',{locals}); // so instead of response we use render here becasue we want to display our content on the page, we use render in terms of web dev because that means we are creating or diplaying on a web page

})


/*
*GET/
* POST:search term
*/
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "search",
      description: "simple blog created with Nodejs,Express and Mongodb"
    }
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar =searchTerm.replace(/[^a-zA-Z0-9]/g,"")

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
      ]
    });

    res.render("search", {
      data,
      locals,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

  //res.render('index',{locals}); // so instead of response we use render here becasue we want to display our content on the page, we use render in terms of web dev because that means we are creating or diplaying on a web page

});





































































// function insertPostData () { // so we used the function to insert data inside our database
//   Post.insertMany([
//     {
//       title: "Building APIs with Node.js",
//       body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
//     },
//     {
//       title: "Deployment of Node.js applications",
//       body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//     },
//     {
//       title: "Authentication and Authorization in Node.js",
//       body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//     },
//     {
//       title: "Understand how to work with MongoDB and Mongoose",
//       body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//     },
//     {
//       title: "build real-time, event-driven applications in Node.js",
//       body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//     },
//     {
//       title: "Discover how to use Express.js",
//       body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//     },
//     {
//       title: "Asynchronous Programming with Node.js",
//       body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//     },
//     {
//       title: "Learn the basics of Node.js and its architecture",
//       body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//     },
//     {
//       title: "NodeJs Limiting Network Traffic",
//       body: "Learn how to limit netowrk traffic."
//     },
//     {
//       title: "Learn Morgan - HTTP Request logger for NodeJs",
//       body: "Learn Morgan."
//     },
//   ])
// }

// insertPostData();