const ProductCasero = require("./../dao/ProductCasero");
const util = require("./../../utils/util");

class ProductCaseroController {
    
    async perfilCasero(req,res){
      let _ = req.body;
      let result = await ProductCasero.validar_token(_.token);
  
      if ((result.length > 0)) {
      
        
         let resultado=await ProductCasero.perfilCasero(_.token);
      

          res.send({ success: true, message: "succesfully !!",data:resultado });
       
      } else {
        res.send({ success: false, message: "bad request !!" });
      }
    } 
    async actualizarpuesto(req,res){
        let _ = req.body;
        let result = await ProductCasero.validar_token(_.token);
    
        if ((result.length > 0)) {
          let [{id}]=await ProductCasero.encontrarid(_.token);
          
            await ProductCasero.actualizarCasero(_.email,id);
            await ProductCasero.actualizarPuesto(_.categoria,_.id_puesto);

            res.send({ success: true, message: "succesfully !!" });
         
        } else {
          res.send({ success: false, message: "bad request !!" });
        }
      }
      async pedidosxid(req,res){
        let _ = req.body;
        let result = await ProductCasero.validar_token(_.token);
    
        if ((result.length > 0)) {
          let [{id}]=await ProductCasero.encontrarid(_.token);
          
           let resultado=await ProductCasero.pedidosxid(id);
        

            res.send({ success: true, message: "succesfully !!",data:resultado });
         
        } else {
          res.send({ success: false, message: "bad request !!" });
        }
      }
      async listaCategorias(req,res){
        let _ = req.body;
        let result = await ProductCasero.validar_token(_.token);
    
        if ((result.length > 0)) {
       
          
           let resultado=await ProductCasero.listaCategorias();
        

            res.send({ success: true, message: "succesfully !!",data:resultado });
         
        } else {
          res.send({ success: false, message: "bad request !!" });
        }

      }
      
      async productosxcategoria(req,res){
        let _ = req.body;
        let result = await ProductCasero.validar_token(_.token);
    
        if ((result.length > 0)) {
          
           let resultado=await ProductCasero.productosxcategoria(_.id_categoria);
        

            res.send({ success: true, message: "succesfully !!",data:resultado });
         
        } else {
          res.send({ success: false, message: "bad request !!" });
        }

      }
      async abastecimiento(req,res){
        let _ = req.body;
        let result = await ProductCasero.validar_token(_.token);
    
        if ((result.length > 0)) {
          let [{id}]=await ProductCasero.encontrarid(_.token);
          await ProductCasero.crearpedido(id);
           let {insertId}=await ProductCasero.crearpedido(_.id_categoria);
           let id_pedido=insertId;
          let datos=_.datos;
          for (const element of datos) {
            await ProductCasero.crearpedidoproduct(element['id_producto'],id_pedido);
          }

          await ProductCasero.updatepedido(_.cantidad,_.total);

            res.send({ success: true, message: "succesfully !!" });
         
        } else {
          res.send({ success: false, message: "bad request !!" });
        }
      }
      async milistaProductos(req,res){
        let _ = req.body;
        let result = await ProductCasero.validar_token(_.token);
    
        if ((result.length > 0)) {
          let [{id}]=await ProductCasero.encontrarid(_.token);
           let resultado=await ProductCasero.milistaProductos(id);
        

            res.send({ success: true, message: "succesfully !!",data:resultado });
         
        } else {
          res.send({ success: false, message: "bad request !!" });
        }
      }

    }

  
  
  module.exports = new ProductCaseroController();
  