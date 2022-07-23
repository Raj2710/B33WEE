var express = require('express');
var router = express.Router();
const {dbUrl,mongodb,MongoClient,dbName} = require('../dbSchema')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try {
    const db = await client.db(dbName)
    let users = await db.collection('user').find().toArray();
    res.json({
      stausCode:200,
      data:users
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

router.post('/add-user',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try {
    const db = await client.db(dbName)

    let user = await db.collection('user').insertMany(req.body);

    res.json({
      stausCode:200,
      message:'User created successfully'
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
