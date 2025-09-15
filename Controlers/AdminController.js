
const Cryptr = require('cryptr');
const jwt = require("jsonwebtoken")

const AdminModel=  require("../models/AdminModel");
const passwordcrypter = new Cryptr('wscubetech');




class AdminController{

    sign_up(data){
   

return new Promise(
    async(resolve, reject) => {
        
    try {
        if( data.name&& data.contact && data.password && data.email &&data.confirm_password){

            const exits_email = await AdminModel.findOne({email:data.email})


            if(exits_email){
                reject( { msg: "This email addres already exist", status: 0 })  
            }

            else{
                if(data.password == data.confirm_password){

                    const encryptedpassword=passwordcrypter.encrypt(data.password);
                    
                    const admin= AdminModel(
                        
                        {
                            name:data.name,
                            email:data.email,
                            contact: data.contact,
                            password:encryptedpassword,
                            role:data.role
                    
                        }
                    )
                   

                      await  admin.save()

                      
                      .then(
                        async(succes) => {
                       
                            const token = jwt.sign({ admin: admin ,role: admin?.role}, process.env.TOKEN_KEY, { expiresIn: '1h' });
                             const { password, ...adminData } = admin.toObject()

                            resolve(
                                { msg: "admin sign_up succesfully", status: 1 , 
                                    admin:adminData,
                                    token
                                }
                               )
                     
                    })

                    .catch((error) => {
                        

                        reject(
                            { msg: "admin sign_up not succesfully", status: 0 }
                           )
                       

                    })

                       
                  
                    
                        
                    
                }
        
        else{
            reject( { msg: "password and confirm_password is  not matching", status: 0 })
        }
        
            }


        }
        else{
            reject( { msg: "plaese fill all inputs", status: 0 })
        }
        
     
        
    } 
    catch (error) {
       
        reject(
            
            { msg: "internal error", status: 0 }
           )
    }

    
})
}




 login(data){
    
   
    return new Promise(
        async(resolve, reject) => {
        try {


if( data.email && data.password)
   
    {

    const admin= await AdminModel.findOne({email:data.email})

    if(admin){
    

    
    const decrypted_password = passwordcrypter.decrypt(admin.password);
   
if(decrypted_password == data.password){

    const token = jwt.sign({ admin: admin ,role: admin?.role}, process.env.TOKEN_KEY, { expiresIn: '1h' });
    const { password, ...adminData } = admin.toObject()
    resolve(

           
       {msg:" login succesfull" , status: 1, 
        
        admin:adminData,
        token
    }

    )

}
else{

reject(
          
        { msg:"password is worng" ,status: 0 }
       ) 
}



    }

  else{
      reject(
          
          { msg: " dont have any accouted with this email", status: 0 }
         )
  }
}

   else{
    
    reject(
                
        { msg: "please fill the email and password", status: 0 }
       )
   }      
         
            
        } 
        catch (error) {
           console.log(error);
           
            reject(
                
                { msg: "internal error", status: 0 }
               )
        }
    
        
    })

    }

   
    
        AdminVerify(id){
   

return new Promise(
    async(resolve, reject) => {
        
    try {
       
            const exits_admin = await AdminModel.findOne({_id:id})


            if(exits_admin){
                 const token = jwt.sign({ admin: exits_admin ,role: exits_admin?.role}, process.env.TOKEN_KEY, { expiresIn: '1h' });
                const{password,...admindata}=exits_admin.toObject()
                reject( { msg: "verify Done", status: 1, admin:admindata,token })  
            }

   else  reject(
            
            { msg: "this User is not Exist", status: 0 }
            
           )
        
     
        
    } 
    catch (error) {
       
        reject(
            
            { msg: "internal error", status: 0 }
           )
    }

    
})
}


}


module.exports = AdminController
