const express = require("express")
const studentRoutes = require('./src/student/routes')  // importing from our student routes 
const app= express()
const port =3000

//adding a middleware
app.use(express.json()); //this will allows us to get our data from our endpoints

app.get("/",(req,res)=>{
    res.send("hello guys")
});

app.use('/api/v1/students',studentRoutes);
app.listen(port, ()=> console.log(`app is listening on port ${port}`));