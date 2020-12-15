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
        for (const element of resultado2) {
          let actual=element['actual'];
          let aforo=element['aforo'];
          let color;
          if(actual<(aforo/4)){
            color=0;
         } else if(actual<(aforo/2)){
            color=1;
         } else {
            color=2;
         } 
         element['color']=color;
        }
        
        let total=resultado.concat(resultado2)
      
          res.send({ success: true, message: "Successfully !!", data: total });
        } else {
          res.send({ success: false, message: "Invalid User" });
        }
      }
      async aforoLimaFechas(req,res){
        let _ = req.body;
        let result = await admin.validar_token(_.token);
        if ((result.length > 0)) {
          let resultado = await admin.idsMercados();
          console.log(resultado);
          for (const element of resultado) {
              
              let [{max,hora1}] =await admin.maxFechas(_.fecha1,_.fecha2,element['id']);
              let [{min,hora2}] =await admin.minFechas(_.fecha1,_.fecha2,element['id']);
              let [{totaldia}] =await admin.sumaFechas(_.fecha1,_.fecha2,element['id']);
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
      async temperatura(req,res){
        let _ = req.body;
        let result = await admin.validar_token(_.token);
        if ((result.length > 0)) {
          let resultado = await admin.idsMercados();
        
          for (const element of resultado) {
           console.log(element['id']); 
            let respuesta=await admin.temperatura(element['id']);
            console.log(respuesta);
            let maximo=respuesta[0].cantidad1;
            let [{CantIdeal}]=await admin.cantidadmaximos(element['id']);
          
            let minimo=respuesta[0].cantidad2;
            let [{CantnoIdeal}]=await admin.cantidadminimos(element['id']);

            element['maxima_temp']=maximo;
            element['minima_temp']=minimo;
            element['cantidad_ideal']=CantIdeal;
            element['cantidad_noideal']=CantnoIdeal;

          }
         
            res.send({ success: true, message: "succesfully !!", data: resultado });
        } else {
          res.send({ success: false, message: "bad request !!" });
        }
      }
      async temperaturaFechas(req,res){
        let _ = req.body;
        let result = await admin.validar_token(_.token);
        if ((result.length > 0)) {
          let resultado = await admin.idsMercados();
          
          for (const element of resultado) {
            
            let [{maximatemp}] = await admin.temperaturaAltaFechas(_.fecha1,_.fecha2,element['id']);
            let [{cantTempAlta}]=await admin.cantTempAlta(_.fecha1,_.fecha2,element['id']);
            let [{TotalAsist}]=await admin.TotalAsistente(_.fecha1,_.fecha2,element['id']);

            element['maximatemp']=maximatemp;
            element['cantTempAlta']=cantTempAlta;
            element['TotalAsist']=TotalAsist;
              
            
          }

            res.send({ success: true, message: "succesfully !!", data: resultado });
        } else {
          res.send({ success: false, message: "bad request !!" });
        }
      }
      async ip(req,res){
        var ip = require('ip');

        console.log(ip.address());

      }

}
module.exports = new AdminController();