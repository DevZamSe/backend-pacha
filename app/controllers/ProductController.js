const Product = require("../dao/Product");
const User = require("../dao/User");
const util = require("./../../utils/util");

class ProductController {

  async personasActual(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);
    if ((result.length > 0)) {

      let [{cola,actual}] = await Product.cantidadExacta(_.id_mercado);
      console.log(cola);
      console.log(actual);

      let ingreso=cola+_.ingreso;
      let salida=actual+_.salida;
      await Product.personasActual(ingreso,salida,_.id_mercado);

        res.send({ success: true, message: "succesfully !!" });
     
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
  async todosMercados(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);
  
      if (result.length > 0) {
        let resultado = await Product.todosMercados();

        res.send({ success: true, message: "succesfully !!", data: resultado });
      } else {
        res.send({ success: false, message: "bad request !!" });
      }
    
  }
  async categoriasxmercado(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);
    if ((result.length > 0)) {
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
    if ((result.length > 0)) {
      let resultado = await Product.caserosxcategoria(_.id_mercado);
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

    if ((result.length > 0)) {
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

    if ((result.length > 0)) {
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

    if ((result.length > 0)) {
      let [{id}]=await Product.encontrarid(_.token);
       await Product.agregarlista(id);

        res.send({ success: true, message: "succesfully !!" });
     
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
  
  async agregaralista(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);
    var idspedido=[];    
    if ((result.length > 0)) {
       let [{id}]=await Product.encontrarid(_.token);
     
       let datos=_.datos;
       let cuenta= await Product.cantidadLista(id);
       let texto=`Lista de compras ${cuenta.length+1}`;
       let {insertId}=await Product.agregarlista(id,texto);
       let id_lista=insertId;  
       for (const element of datos) {
        let {insertId}=await Product.agregarprepedido(element['id'],element['aniadido'],id);
         idspedido.push(insertId);
         await Product.agregaralista(id_lista,insertId);
       }
       console.log(idspedido);

        res.send({ success: true, message: "succesfully !!" });
      
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
  async updatealista(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);
   
    if ((result.length > 0)) {
      let [{id}]=await Product.encontrarid(_.token);
       let datos=_.datos;
       for (const element of datos) {
        await Product.updatelistas(element['titulo'],element['id'],id);
       }
        res.send({ success: true, message: "succesfully !!" });
      
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
  async deleteproductoslista(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);
   
    if ((result.length > 0)) {
     
      await Product.deleteproductoslista(_.id_lista,_.id_prepedido);
      await Product.deleteprepedidolista(_.id_prepedido);


        res.send({ success: true, message: "succesfully !!" });
      
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }

 
  async agregarFavorito(req, res){
    let _= req.body;
    let result = await Product.validar_token(_.token);

    if ((result.length > 0)) {
      let [{id}] = await Product.encontrarid(_.token);
     
      if(_.estado == 1) {
        await Product.agregarFavorito(_.id_producto, id,_.estado)
        res.send({ success: true, message: "succesfully !!"});
      } else {
        await Product.eliminarFavorito(id,_.id_producto)
        res.send({ success: true, message: "succesfully !!" });
      }
    } else {
      res.status(500).send({ success: false, message: "bad request !!" });
    }
  }
  async mislistas(req, res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    if ((result.length > 0)) {
      let [{id}] = await Product.encontrarid(_.token);
      let resultado = await Product.mislistas(id);
      if (resultado.length > 0) {
        res.send({ success: true, message: "succesfully !!", data: resultado });
      } else {
        res.send({ success: false, message: "bad request !!" });
      }
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
  async misproductosxlista(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    if ((result.length > 0)) {
      let [{id}] = await Product.encontrarid(_.token);
      let resultado = await Product.misproductosxlista(_.id_lista,id);
      if (resultado.length > 0) {
        res.send({ success: true, message: "succesfully !!", data: resultado });
      } else {
        res.send({ success: false, message: "bad request !!" });
      }
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
  async categoriasRecetas(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    if ((result.length > 0)) {
     
      let resultado = await Product.categoriasRecetas();
      if (resultado.length > 0) {
        res.send({ success: true, message: "succesfully !!", data: resultado });
      } else {
        res.send({ success: false, message: "bad request !!" });
      }
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
  async recetas(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    if ((result.length > 0)) {
     
      let resultado = await Product.recetas(_.id_categoria);
      if (resultado.length > 0) {
        res.send({ success: true, message: "succesfully !!", data: resultado });
      } else {
        res.send({ success: false, message: "bad request !!" });
      }
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
  async detalleReceta(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    if ((result.length > 0)) {
     
      let resultado = await Product.detalleReceta(_.id_receta);
      if (resultado.length > 0) {
        res.send({ success: true, message: "succesfully !!", data: resultado });
      } else {
        res.send({ success: false, message: "bad request !!" });
      }
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
  async aforo(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    if ((result.length > 0)) {
     
      let resultado = await Product.aforo(_.id_mercado);
      if (resultado.length > 0) {
        res.send({ success: true, message: "succesfully !!", data: resultado });
      } else {
        res.send({ success: false, message: "bad request !!" });
      }
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
  async eliminarlista(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    if ((result.length > 0)) {
     
      let resultado=await Product.encontrarpre(_.id_lista);
       await Product.eliminardeDetallelista(_.id_lista);
      for (const element of resultado) {
            await Product.eliminarprepedidos(element['id_prepedido']);
      }
       await Product.eliminarlista(_.id_lista);
     
    
        res.send({ success: true, message: "succesfully !!"});
     
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
}


module.exports = new ProductController();
