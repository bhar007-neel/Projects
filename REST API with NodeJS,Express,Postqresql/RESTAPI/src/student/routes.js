const  {Router }= require('express');  //importing router from the express module
const controller= require('./controller');



const router = Router();  // creating an instance
 
router.get('/', controller.getStudents);  // route for getting the students
router.get('/:id',controller.getStudentById);      // route for getting specific students

// now the same way we will use different routes for updating, deleting the data

// lets go ahead and do the add the data that means we will use post or give some information to the post,

router.post('/',controller.addStudent);

// Now we have to create a delete route 
router.delete('/:id',controller.removeStudent);

// routes to updata a student
router.put('/:id', controller.updateStudent);



//logic for each routes so that we have a clear code,we only to have one root for our router, then we going to import this router in server.js
module.exports=router;