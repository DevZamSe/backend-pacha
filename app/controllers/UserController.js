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
      res.send({ success: true, message: "succesfully!!" });
    } else {
      res.send({ success: false, message: "Bad request !!" });
    }
  }
  async validarActualizar(req, res) {
    let _ = req.body;

    let result = await User.validarToken(_.token);
    let token = util.generateToken();

    if (result.length > 0) {
      if (result[0].token == _.token) {
        let user = result[0];
        user.token = token;

        console.log("token", token);
        console.log(user);
        console.log(result[0]);

        await User.updateTokenUser(user.id_cliente, token);
        res.send({ success: true, message: "Successfully !!", data: user });
      }
    } else {
      res.send({ success: false, message: "Invalid User" });
    }
  }
}

module.exports = new UserController();
