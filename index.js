const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PORT = 8000

let users = [];


app.get('/',(req,res)=>{
   res.send({
    statusCode:200,
    length:users.length,
    data:users
   })
})

app.get('/:id',(req,res)=>{
    if(req.params.id<users.length)
    {
        res.send(
            {
                statusCode:200,
                data:users[req.params.id]
            }
        )
    }
    else
    {
        res.send({
            statusCode:200,
            message:"Selected ID does not exists"
        })
    }
})

app.post('/add-user',(req,res)=>{
    for(let i in req.body)
    {
        users.push(req.body[i])
    }
    res.send({
        statusCode:201,
        message:"Data Inserted Successfully"
    })
})

app.put('/edit-user/:id',(req,res)=>{
    if(req.params.id<users.length)
    {
        users.splice(req.params.id,1,req.body)
        res.send({
            statusCode:200,
            message:"Data Modified Successfully",
            data:users
        })
    }
    else{
        res.send({
            statusCode:200,
            message:"Selected ID does not exists"
        })
    }
})

app.delete('/remove-user/:id',(req,res)=>{
    if(req.params.id<users.length)
    {
        users.splice(req.params.id,1)
        res.send({
            statusCode:200,
            message:"Data Deleted Successfully",
            data:users
        })
    }
    else{
        res.send({
            statusCode:200,
            message:"Selected ID does not exists"
        })
    }
})

app.listen(PORT,()=>console.log('App is listenig to Port '+PORT));


//npm init
//npm i express
//create an index.js file
//Your code