const express = require("express");
const app = express();
const Port = 5000;
// temp database
const db=[]



// middleware
app.use(express.json());
app.use(express.static("public"))

function mw(req,res,next){
    console.log("hit the middleware")
    next()
}

app.get("/",mw,(req,res)=> {
    console.log("you have reached the home route : GET")
    res.status(200).send('<h1> this is capital </h1><p><i>Nice nice</i></p>')

})

app.post('/api/info', (req, res)=>{
    const { information } = req.body
    console.log("the posted message was : ", information)
    db.push(information)
    console.log("db:", db)
    res.status(201).json({"your message": information})

})

app.put("/api",mw,(req,res)=>{
    const {word,banana} = req.query
    console.log(word, banana)
    res.sendStatus(200)

})

app.delete("/delete/:id/:name",(req,res)=> {
    const {id,name} =req.params
    console.log("what do you want to delete")
    res.send(200)
})


app. listen(Port,() => console.log(`server has been started on the port : ${Port}`))