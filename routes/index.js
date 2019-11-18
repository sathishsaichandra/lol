const router=require('express').Router();
const app=require('express')();
const mysql_connector=require('../services/databasequeries')
const validation=require('../routes/validator');
const bcrypt=require('./bcrypt');
const tokenWorking=require('./auth');
const boom = require('express-boom');
app.use(boom());

router.post('/Register', async (req,res,next)=>{
try{
 var after_validate=await validation.admin(req.body);
 after_validate.password=await bcrypt.hash(after_validate.password);
 var after_database=await mysql_connector.Register(after_validate)
 res.send(after_database);

}catch(error){
  res.send(error);
}
   
});
router.post('/Login', async (req,res,next)=>{
  try{
    var type=req.body.type;
    var username=req.body.username;
    var password=req.body.password;
    var hashpassword=await mysql_connector.Login(type,username);
    if(hashpassword.length>40){
      var statement=await bcrypt.check(password,hashpassword);
      if(statement){
        var token=await tokenWorking.tokenGenerated(type,username,password);   
        res.send(`sucessfully login
        
        ${token}`);
      }
      else{
        res.send('password is not matched');
      } 
    }
    else{
      res.send('there is a ploblem in hashing of password')
    }
    
    
  }catch(error){
    res.send(error)
    
  }
     
  });
  router.post('/find', async (req,res,next)=>{
    try{
      var token=req.body.token;
      var data=await tokenWorking.verify(token);
      if(data){
var type=data.data.type;
var orig_latitude=req.body.latitude;
var orig_longitude=req.body.longitude;
var distance=req.body.distance;
var result=await mysql_connector.find(type,orig_latitude,orig_longitude,distance);
res.send(result);

      }
    }catch(error){
      res.send(error)
      
    }
       
    });
  router.post('/Update', async (req,res,next)=>{
    try{
   var verified_user=await tokenWorking.verify(req.body.token);
   if(verified_user){
     var type=verified_user.data.type;
     var username=verified_user.data.username;
     var latitude=req.body.latitude;
     var longitude=req.body.longitude;
     var updated_data=await mysql_connector.Update(type,username,latitude,longitude);
     res.send(updated_data);  
   }
   
    
    }catch(error){
      res.send(error)
      
    }
       
    });

    router.post('/Admin_fetch', async (req,res,next)=>{
      try{
        var verified_user=await tokenWorking.verify(req.body.token);
    if(verified_user){
      var type=verified_user.data.type;
      var username=verified_user.data.username;
      var fetchOf=req.body.fetch;
 var fetched_data=await mysql_connector.Fetch(type,username,fetchOf);
 res.send(fetched_data);
    }
      
      }catch(error){
        res.send(error)
        
      }
         
      });



module.exports=router;