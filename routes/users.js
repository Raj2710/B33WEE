var express = require('express');
var router = express.Router();
const {dbUrl,mongodb,MongoClient,dbName} = require('../dbSchema')
const {hashPassword,hashCompare,createToken,validate}=require('../auth');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(`<h1> 
  Welcome to User Route
  </h1>
  <h3>Please hit the proper route</h3>
  <p>/all for all users</p>
  <p>/add-user</p>
  `);
});

router.get('/all',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try {
    let token = req.headers.authorization.split(" ")[1]
    let validation = await validate(token)

    let user = await db.collection('user').findOne({email:validation.email,role:validation.role})
    if(user && validation.validity)
    {
        const db = await client.db(dbName)
      let users = await db.collection('user').find().toArray();
      res.json({
        stausCode:200,
        data:users
      })
    }
    else
    {
      res.json({
        stausCode:401,
        message:"Token Expired",
      }) 
    }

  } catch (error) {
      console.log(error)
      res.json({
        statusCode:500,
        message:"Internal Server Error"
      })
  }
  finally
  {
    client.close()
  }
})


//signups
router.post('/add-user',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try {
    const db = await client.db(dbName)
    let user = await db.collection('user').findOne({email:req.body.email})
    if(user)
    {
      res.json({
        stausCode:200,
        message:'User Already Exists'
      })
    }
    else
    {
      req.body.password = await hashPassword(req.body.password)
      user = await db.collection('user').insertOne(req.body)
      res.json({
        stausCode:200,
        message:'User Created Successfully'
      })
    }
  } catch (error) {
      console.log(error)
      res.json({
        statusCode:500,
        message:"Internal Server Error"
      })
  }
  finally
  {
    client.close()
  }
})


//LOGIN
router.post('/login',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try {
    const db = await client.db(dbName)
    let user = await db.collection('user').findOne({email:req.body.email})
    if(user)
    {
        if(await hashCompare(req.body.password,user.password))
        {

          let token = await createToken({
            email:user.email,
            role:user.role
          })

          res.json({
            statusCode:200,
            message:"Login Successfull",
            token
          })
        }
        else
        {
          res.json({
            statusCode:401,
            message:"Invalid Credentials"
          })
        }
    }
    else
    {
      res.json({
        statusCode:404,
        message:"User Account Not Found"
      })
    }
    
  } catch (error) {
      console.log(error)
      res.json({
        statusCode:500,
        message:"Internal Server Error"
      })
  }
  finally
  {
    client.close()
  }
})

router.post('/edit-user/:id',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try {
    const db = await client.db(dbName)

    let user = await db.collection('user').updateOne({_id:mongodb.ObjectId(req.params.id)},{
      $set:{name:req.body.name, 
            email:req.body.email,
            role:req.body.role,
            password:req.body.password
          }
    })

    res.json({
      stausCode:200,
      message:'User Updated successfully',
      data:user
    })

  } catch (error) {
      console.log(error)
      res.json({
        statusCode:500,
        message:"Internal Server Error"
      })
  }
  finally
  {
    client.close()
  }
})

router.delete('/delete-user/:id',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try {
    const db = await client.db(dbName)

    let user = await db.collection('user').deleteOne({_id:mongodb.ObjectId(req.params.id)})

    res.json({
      stausCode:200,
      message:'User Deleted successfully',
      data:user
    })

  } catch (error) {
      console.log(error)
      res.json({
        statusCode:500,
        message:"Internal Server Error"
      })
  }
  finally
  {
    client.close()
  }
})

module.exports = router;
