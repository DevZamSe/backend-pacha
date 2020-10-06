const User = require("./../dao/User");
const util = require("./../../utils/util");


class UserController {
  async login(req, res) {
    let _ = req.body;
    let result = await User.login(_.email, _.pass);
    let token = util.generateToken();

    if (result.length > 0) {
      let user = result[0];
      user.token = token;
      res.send({ success: true, message: "Successfully !!", data: result });
    } else {
      res.send({ success: false, message: "Invalid User" });
    }
  }
  async registroUsuario(req, res) {
    let _ = req.body;
    let token = util.generateToken();
    let result = await User.registroUsuario(
      _.nombre,
      _.email,
      _.direccion,
      _.lat,
      _.long,
      _.referencia,
      _.pass,
        token,
      _.tipo_cliente
    );

    if (result != null) {
      res.send({ success: true, message: "succesfully!!",data:[{token}] });
    } else {
      res.send({ success: false, message: "Bad request !!" });
    }
  }
 async datos(req,res){
  let _ = req.body;
  let result = await User.validar_token(_.token);
  if ((result.length > 0)) {
    let resultado = await User.datos(_.token);
   
      res.send({ success: true, message: "succesfully !!", data: resultado });
  } else {
    res.send({ success: false, message: "bad request !!" });
  }
 }
}

module.exports = new UserController();
