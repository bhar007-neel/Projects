// we want to send students from our student database to the person pinging at our website
// we will make a students function that we will export,

const pool = require("../../db");
const queries = require('./queries')

// so in the get students function we go and fetch from our database, so we go the pool and select student thats our query and then either we get an error or we get results, so if an error we display our error and if not the we display status 200 that means OK and we going to display our results in json format where we display the rows of our table


const getStudents = (req, res) => {
    // console.log("getting students");
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
};

// creating a specific controller or a logic for getting specific student by ID

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

// Now we will create the same logic for the posting or adding items to our database, so when we are sending we will be sending a json file with it.

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body  // so these will be our request
    // so before we add we want to make sure that email is valid => that means it is not in the data
    // so lets check first that the email exists or not
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        //queries.checkEmailExists=> this is our query that checks that email exits or not
        if (error) throw error
        if (results.rows.length) {
            res.send("email already exists")
        }

        // so now we add the email if it exists
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if (error) throw error
            res.status(201).send("student Created successfully")
        });
    });

}

// Now we will create a remive student function

const removeStudent =(req,res)=>{
    const id = parseInt(req.params.id);
    // lets check if students exist or not
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if(noStudentFound){
        res.send("student does not exist in database")
        }
        pool.query(queries.removeStudent,[id],(error,results)=>{
            if(error) throw error;
            res.status(200).send("students removed successfully")
        })
      
    });
    
};

// logic to update studnets
const updateStudent =(req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    //check if student exists
    pool.query(queries.getStudentById,[id],(error,results)=>{
        const noStudentFound = !results.rows.length;
        if(noStudentFound){
            res.send("no student found")
        }
        pool.query(queries.updateStudent,[name, id],(error,results)=>{
            if(error) throw error;
            res.status(200).send("name updated successfully");
        });
    });
}

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
};