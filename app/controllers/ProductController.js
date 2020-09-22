const Product = require("../dao/Product");
const User = require("../dao/User");
const util = require("./../../utils/util");

class ProductController {

  async categoriasxmercado(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);
    if ((result.data = _.token)) {
      let resultado = await Product.categoriasxmercado(_.id_mercado);
      if (resultado.length > 0) {
        res.send({ success: true, message: "succesfully !!", data: resultado });
      } else {
        res.send({ success: false, message: "bad request !!" });
      }
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
async caserosxcategoria(req,res){
  let _ = req.body;
    let result = await Product.validar_token(_.token);
    if ((result.data = _.token)) {
      let resultado = await Product.caserosxcategoria(_.id_categoria);
      if (resultado.length > 0) {
        res.send({ success: true, message: "succesfully !!", data: resultado });
      } else {
        res.send({ success: false, message: "bad request !!" });
      }
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
}
  async productosxpuesto(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    if ((result.data = _.token)) {
      let resultado = await Product.productosxpuesto(_.id_casero);
      if (resultado.length > 0) {
        res.send({ success: true, message: "succesfully !!", data: resultado });
      } else {
        res.send({ success: false, message: "bad request !!" });
      }
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
  async detalleProducto(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    if ((result.data = _.token)) {
      let resultado = await Product.detalleProducto(_.id_producto);
      if (resultado.length > 0) {
        res.send({ success: true, message: "succesfully !!", data: resultado });
      } else {
        res.send({ success: false, message: "bad request !!" });
      }
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
  async agregaralista(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    if ((result.data = _.token)) {
      let id=await Product.encontrarid(_.token);
      let resultado = await Product.agregaralista(id,_.id_producto);
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
