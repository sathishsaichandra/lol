const joi=require('joi');
const schema=joi.object().keys({
    type:joi.string().alphanum().min(2).max(8).required(),
    username: joi.string().alphanum().min(4).max(8).required(),
    phone:joi.string().min(10).max(13),
    email:joi.string().trim().regex(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/),
    password: joi.string().min(3).max(15).required(),
password_confirmation: joi.any().valid(joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })

})
var data={};
data.admin=(validate_data)=>{
    return new Promise((resolve,reject)=>{
       joi.validate(validate_data,schema,(err,result)=>{
           
          if(err){
              reject("There is an error in login");
          }
          else{
              resolve(result);
              
          }
           
       })
       
    })
}
module.exports=data;