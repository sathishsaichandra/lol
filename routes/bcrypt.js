const bcrypt=require('bcryptjs');
var data={};
data.hash=async (password)=>{
   hashPassword= await bcrypt.hash(password, 8)
   return(hashPassword);
}

data.check=async (password,hashPassword)=>{
    check_password=await bcrypt.compare(password,hashPassword);
    return (check_password)
    
    
}
module.exports=data;