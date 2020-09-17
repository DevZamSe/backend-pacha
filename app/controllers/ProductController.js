const Product = require("../dao/Product");
const User = require("../dao/User");
const util = require("./../../utils/util");

class ProductController {

  async categoria(req, res) {
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    let filtro = 0;

    switch (_.posicion) {
      case 1:
        filtro = 1;
        break;
      case 2:
        filtro = 2;
        break;
      case 3:
        filtro = 3;
        break;
      case 4:
        filtro = 4;
        break;
      case 5:
        filtro = 5;
        break;
      case 6:
        filtro = 6;
        break;
      case 7:
        filtro = 7;
        break;
      default:
        filtro = 0;
        break;
    }

    if ((result.data = _.token)) {
      let resultado;
      if (_.seccion === 1) {
        resultado = await Product.categoriaservicio(filtro);
      } else {
        resultado = await Product.categoriapeluquerias(filtro);
      }

      if (resultado.length > 0) {
        res.send({
          success: true,
          message: "Successfully !!",
          data: resultado,
        });
      } else {
        res.send({ success: false, message: "Bad request" });
      }
    } else {
      res.send({ success: false, message: "Bad request" });
    }
  }

  async productosxpuesto(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    if ((result.data = _.token)) {
      let resultado = await Product.productosxpuesto();
      if (resultado.length > 0) {
        res.send({ success: true, message: "succesfully !!", data: resultado });
      } else {
        res.send({ success: false, message: "bad request !!" });
      }
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
 
  
}


module.exports = new ProductController();
