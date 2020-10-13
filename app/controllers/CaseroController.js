const Casero = require("./../dao/Casero");
const util = require("./../../utils/util");
 

class CaseroController {
    async login(req, res) {
      let _ = req.body;
      let result = await Casero.login(_.email, _.pass);
      let token = util.generateToken();
  
      if (result.length > 0) {
        let casero = result[0];
        casero.token = token;
        res.send({ success: true, message: "Successfully !!", data: result });
      } else {
        res.send({ success: false, message: "Invalid User" });
      }
    }
    async registroCasero(req, res) {
      let _ = req.body;
      let token = util.generateToken();
      let result = await Casero.registroCasero(
        _.nombre,
        _.email,
        _.pass,
        _.lat,
        _.long,
        _.ruc,
        token
      );
      let id= result['insertId'];
      
      let resultado=await Casero.registroPuesto(_.puesto,_.empresa,_.id_mercado,id,_.id_categoria);
      let id_puesto=resultado['insertId'];
     
      if (result != null) {
        res.send({ success: true, message: "succesfully!!",data:[{ token,id_puesto }] });
      } else {
        res.send({ success: false, message: "Bad request !!" });
      }
    }
   async datos(req,res){
    let _ = req.body;
    let result = await Casero.validar_token(_.token);
    if ((result.length > 0)) {
      let resultado = await User.datos(_.token);
     
        res.send({ success: true, message: "succesfully !!", data: resultado });
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
   }

   async mercados(req,res){
    let _ = req.body;

      let result=await Casero.mercados();
      res.send({ success: true, message: "succesfully !!",data:result });
     
   
  }

  }
  
  module.exports = new CaseroController();
  