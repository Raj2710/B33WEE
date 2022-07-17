var express = require('express');
var router = express.Router();

let users = [];

router.get('/',(req,res)=>{
  res.send({
   statusCode:200,
   length:users.length,
   data:users
  })
})

router.get('/:id',(req,res)=>{
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

router.post('/add-user',(req,res)=>{
   for(let i in req.body)
   {
       users.push(req.body[i])
   }
   res.send({
       statusCode:201,
       message:"Data Inserted Successfully"
   })
})

router.put('/edit-user/:id',(req,res)=>{
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

router.delete('/remove-user/:id',(req,res)=>{
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

module.exports = router;
