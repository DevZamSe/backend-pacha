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
  async agregarlista(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    if ((result.data = _.token)) {
      let id=await Product.encontrarid(_.token);
       await Product.agregarlista(id,_.tipo);
     
        res.send({ success: true, message: "succesfully !!" });
     
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
  async agregaralista(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    if ((result.data = _.token)) {
      await Product.agregarprepedido(_.id_producto,_.cantidad,_.precio);
      let [{id_prepedido}]=await Product.findippre(_.id_producto,_.cantidad,_.precio);
      console.log(id_prepedido);
      let [{id_lista}]=await Product.encontrarlista(_.token);
      await Product.agregaralista(id_lista,id_prepedido);
      
        res.send({ success: true, message: "succesfully !!" });
      
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
 
  async agregarFavorito(req, res){
    let {token, id_producto, estado} = req.body;
    let result = await Product.validar_token(token);

    if ((result.data = token)) {
      let [{id}] = await Product.encontrarid(token);
      console.log(id);
      console.log(id_producto);
      console.log(estado);
      if(estado == 1) {
        let result = await Product.agregarFavorito(id_producto, id, estado)
        res.send({ success: true, message: "succesfully !!"});
      } else {
        let result = await Product.eliminarFavorito(id, id_producto)
        res.send({ success: true, message: "succesfully !!" });
      }
    } else {
      res.status(500).send({ success: false, message: "bad request !!" });
    }
  }
}


module.exports = new ProductController();
