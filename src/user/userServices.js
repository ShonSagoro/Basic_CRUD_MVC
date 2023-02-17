var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);
const mongoose = require('mongoose');


//CREAR
module.exports.createUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({ email: userDetails.email}, function getResult(errorvalue, result){
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }else{
            if(result !=undefined &&  result !=null){
               resolve({status: false,msg: "El usuario ya existe"});
            }else{
               var userModelData = new userModel();
               userModelData.firstname = userDetails.firstname;
               userModelData.lastname = userDetails.lastname;
               userModelData.email = userDetails.email;
               userModelData.password = userDetails.password;
               var encrypted = encryptor.encrypt(userDetails.password);
               userModelData.password = encrypted;
               userModelData.save(function resultHandle(error, result) {
                  if (error) {
                        reject({status: false,msg: "A ocurrido algun error en la creación del usuario"});
                  } else {
                        resolve({status: true,msg: "usuario creado correctamente"});
                  }
               });
      
            }
         }
      })
   });
}

//LOGIN
module.exports.loginuserDBService = (userDetails)=> {
   return new Promise(function myFn(resolve, reject)  {
                     //email-indica que esta buscando //userDetails.email-con lo que se va a comparar o buscar
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});}
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}
//Encontrar
module.exports.findOneUserDBService = (userDetails)=> {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               resolve({status: true,msg: "Usuario Encontrado", "firstname":result.firstname});
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}
//ELIMINAR
module.exports.deletUseDBService = (userDetails)=> {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOneAndDelete({ email: userDetails.email},function getresult(errorvalue, result) {
         
         if(errorvalue) {
            reject({status: false, msg: "No eliminado"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               resolve({status: true,msg: "Usuario Encontrado - ELIMINADO- "});  
            }
            else {
               reject({status: false,msg: "Detalles de usuario a eliminar invalido"});
            }
         }
      });
   });
}
//Actualizar
module.exports.updateUseDBService = (userDetails)=> {
   var encrypted = encryptor.encrypt(userDetails.password);
   userDetails.password = encrypted;
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOneAndUpdate({ email: userDetails.email},userDetails,function getresult(error, result) {
         
         if(error) {
            reject({status: false, msg: "No ACTUALIZADO"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               resolve({status: true,msg: "Usuario Encontrado - ACTUALIZADO- "});  
            }
            else {
               reject({status: false,msg: "Detalles de usuario a ACTUALIZADO invalido"});
            }
         }
      });
   });
}
module.exports.findAllUseDBService = ()=> {
   return new Promise(function myFn(resolve, reject)  {
      userModel.find(function getresult(error, result) {
         
         if(error) {
            reject({status: false, msg: "Error"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               resolve({status: true,msg: `Usuarios: ${result}`});  
            }
            else {
               reject({status: false,msg: "No hay usuarios"});
            }
         }
      });
   });
}





