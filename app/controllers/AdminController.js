const admin = require("./../dao/Admin");
const util = require("./../../utils/util");
class AdminController{
    async login(req, res) {
        let _ = req.body;
        let result = await admin.login(_.email, _.pass);
        let token = util.generateToken();
    
        if (result.length > 0) {
          let antiguotoken=result[0].token;
          await admin.updateToken(token,antiguotoken); 
          let casero = result[0];
          casero.token = token;
          res.send({ success: true, message: "Successfully !!", data: result });
        } else {
          res.send({ success: false, message: "Invalid User" });
        }
      }
      async aforoLima(req,res){
        let _ = req.body;
        let result = await admin.validar_token(_.token);
        
        if (result.length > 0) {
        let resultado=await admin.aforoActual();

        for (const element of resultado) {
            let actuale=element['actual'];
            let aforoe=element['aforo'];
            let color;
            if(actuale<(aforoe/4)){
               color=0;
            } else if(actuale<(aforoe/2)){
               color=1;
            } else {
               color=2;
            } 
            let [{max,hora1}] =await admin.max(element['id']);
            let [{min,hora2}] =await admin.min(element['id']);
            let [{totaldia}] =await admin.suma(element['id']);
            
            
            element["color"]=color;
            element["maximo"]=max;
            element["horaMaxima"]=hora1;
            element["minimo"]=min;
            element["horaMinima"]=hora2;
            element["totalDia"]=totaldia;
           
            
        }
        let resultado2=await admin.aforoporDia(); 
        
        
      
          res.send({ success: true, message: "Successfully !!", data: resultado,resultado2 });
        } else {
          res.send({ success: false, message: "Invalid User" });
        }
      }
      async aforoLimaFechas(req,res){
        let _ = req.body;
        let result = await admin.validar_token(_.token);
        if ((result.length > 0)) {
          let resultado = await admin.aforoLimaFechas(_.fecha1,_.fecha2);
          for (const element of object) {
              
              let [{max,hora1}] =await admin.maxFechas(element['id']);
              let [{min,hora2}] =await admin.minFechas(element['id']);
              let [{totaldia}] =await admin.sumaFechas(element['id']);
              element["maximo"]=max;
              element["horaMaxima"]=hora1;
              element["minimo"]=min;
              element["horaMinima"]=hora2;
              element["totalDia"]=totaldia;
          }

            res.send({ success: true, message: "succesfully !!", data: resultado });
        } else {
          res.send({ success: false, message: "bad request !!" });
        }
      }
      async mercadoid(req,res){
        let _ = req.body;
        let result = await admin.validar_token(_.token);
        if ((result.length > 0)) {
          let resultado = await admin.mercadoid(_.id_mercado);
          for (const element of resultado) {
            let actuale=element['actual'];
            let aforoe=element['aforo'];
            let color;
            if(actuale<(aforoe/4)){
               color=0;
            } else if(actuale<(aforoe/2)){
               color=1;
            } else {
               color=2;
            } 
            element["color"]=color;
          }
         
            res.send({ success: true, message: "succesfully !!", data: resultado });
        } else {
          res.send({ success: false, message: "bad request !!" });
        }

      }

}
module.exports = new AdminController();