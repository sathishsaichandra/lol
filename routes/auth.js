const jwt=require('jsonwebtoken');
const user={};
user.tokenGenerated=(type,username,password)=>{
    return new Promise((resolve,reject)=>{
    var data={type:type,username:username,password:password};
    
jwt.sign({data},'secret',{expiresIn:"1200s"},(err,token)=>{
    if(err){
        resolve(err.message);
    }
    else{
       resolve(token);
    }
});
});

}

user.logout=(token)=>{
    
    return new Promise((resolve,reject)=>{
        jwt.destroy(token)
        })
    }


user.verify=(token)=>{
    
    return new Promise((resolve,reject)=>{
        jwt.verify(token,'secretkey',(err,data)=>{            
            if(data){
                resolve(data); 
                
                
            }else{
                reject(err.message);
                
            }
        })
    })
}

module.exports=user;