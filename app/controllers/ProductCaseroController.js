const ProductCasero = require("./../dao/ProductCasero");
const util = require("./../../utils/util");

class ProductCaseroController {
    
    async perfilCasero(req,res){
      let _ = req.body;
      let result = await ProductCasero.validar_token(_.token);
  
      if ((result.length > 0)) {
        let [{id}]=await ProductCasero.encontrarid(_.token);
        
         let resultado=await ProductCasero.perfilCasero(_.token);
         let [{likes}]=await ProductCasero.cantidadlikes(id);
          let cantidad={
            likescasero:likes
          }
          resultado.push(cantidad);
          res.send({ success: true, message: "succesfully !!",data:resultado });
       
      } else {
        res.send({ success: false, message: "bad request !!" });
      }
    }
    async updateApodo(req,res){
      let _ = req.body;
      let result = await ProductCasero.validar_token(_.token);
  
      if ((result.length > 0)) {
        let [{id}]=await ProductCasero.encontrarid(_.token);
         await ProductCasero.updateApodo(_.apodo,id);
          res.send({ success: true, message: "succesfully !!" });
       
      } else {
        res.send({ success: false, message: "bad request !!" });
      }
    } 
    async datosmiempresa(req,res){
      let _ = req.body;
      let result = await ProductCasero.validar_token(_.token);
  
      if ((result.length > 0)) {
        
        let [{id}]=await ProductCasero.IdPuestobytoken(_.token);
        console.log(id);
         let resultado=await ProductCasero.datosmiempresa(_.token,id);
      

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
            await ProductCasero.eliminarcategorias(_.id_puesto);
            let datos=_.datos;
            for (const element of datos) {
              await ProductCasero.actualizarPuesto(element['id_categoria'],_.id_puesto);
            }
           

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
      async detallePedido(req,res){
        let _ = req.body;
        let result = await ProductCasero.validar_token(_.token);
    
        if ((result.length > 0)) {
          let [{id}]=await ProductCasero.encontrarid(_.token);

          let [{id_lista}]=await ProductCasero.encontraridLista(_.id_venta);

           let resultado=await ProductCasero.detallePedido(id_lista);
        

            res.send({ success: true, message: "succesfully !!",data:resultado });
         
        } else {
          res.send({ success: false, message: "bad request !!" });
        }
      }
      async updatePedidos(req,res){
        let _ = req.body;
        let result = await ProductCasero.validar_token(_.token);
    
        if ((result.length > 0)) {
          let [{id}]=await ProductCasero.encontrarid(_.token);
          
           await ProductCasero.updatePedidos(_.id_venta);
          let resultado= await ProductCasero.listarPedidosEstado(id);

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
      // async abastecimiento(req,res){
      //   let _ = req.body;
      //   let result = await ProductCasero.validar_token(_.token);
    
      //   if ((result.length > 0)) {
      //     let [{id}]=await ProductCasero.encontrarid(_.token);
          
      //      let {insertId}=await ProductCasero.crearpedido(id);
      //      let id_pedido=insertId;
      //     let datos=_.datos;
      //     for (const element of datos) {
      //       await ProductCasero.crearpedidoproduct(element['id_producto'],id_pedido);
      //     }

      //     await ProductCasero.updatepedido(_.cantidad,_.total);

      //       res.send({ success: true, message: "succesfully !!" });
         
      //   } else {
      //     res.send({ success: false, message: "bad request !!" });
      //   }
      // }
      async abastecimientoCategorias(req,res){
        let _ = req.body;
        let result = await ProductCasero.validar_token(_.token);
    
        if ((result.length > 0)) {
          let [{id}]=await ProductCasero.encontrarid(_.token);
           let resultado=await ProductCasero.abastecimientoCategorias(id);

            res.send({ success: true, message: "succesfully !!",data:resultado });
         
        } else {
          res.send({ success: false, message: "bad request !!" });
        }
      }
      async abastecimientoProduct(req,res){
        let _ = req.body;
        let result = await ProductCasero.validar_token(_.token);
    
        if ((result.length > 0)) {
          let [{id}]=await ProductCasero.encontrarid(_.token);
          let result=await ProductCasero.encontraridPuesto(id);
           console.log(result);
          let id_puesto=result[0].id;
          
           let [{id_almacen}]=await ProductCasero.existealmacen(id_puesto);
            
           let [{precio}]=await ProductCasero.precioProducto(_.id_producto);

           await ProductCasero.abastecimientoProduct(id_almacen,_.id_producto,precio);
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
          let [{id_almacen}]=await ProductCasero.encontraridAlmacen(id);

          
           let resultado=await ProductCasero.milistaProductos(id_almacen);
       
            res.send({ success: true, message: "succesfully !!",data:resultado });
         
        } else {
          res.send({ success: false, message: "bad request !!" });
        }
      }
      async updatePrecio(req,res){
        let _ = req.body;
        let result = await ProductCasero.validar_token(_.token);
    
        if ((result.length > 0)) {
        
         let [{id_almacen}]=await ProductCasero.IdAlmacenbytoken(_.token);
         console.log(id_almacen);
        let datos=_.data;
        for (const element of datos) {
          await ProductCasero.updateprecio(element['precio'],id_almacen,element['id'])
          
        }
           
          res.send({ success: true, message: "succesfully !!" });
         
        } else {
          res.send({ success: false, message: "bad request !!" });
        }
      }
      async eliminarProducto(req,res){
        let _ = req.body;
        let result = await ProductCasero.validar_token(_.token);
        
        if ((result.length > 0)) {
        let [{id_almacen}]=await ProductCasero.IdAlmacenbytoken(_.token);
        await ProductCasero.eliminarProducto(id_almacen,_.id_producto);   
          res.send({ success: true, message: "succesfully !!" });
         
        } else {
          res.send({ success: false, message: "bad request !!" });
        }
      }
      async listaProductos(req,res){
        let _ = req.body;
        let result = await ProductCasero.validar_token(_.token);
    
        if ((result.length > 0)) {
           let [{id_almacen}]=await ProductCasero.IdAlmacenbytoken(_.token);
           let ids=await ProductCasero.encontrarIdsProducto(id_almacen);
           let aniadidos=await ProductCasero.milistaProductosAbastecimiento(id_almacen);
         if (aniadidos!=null) {
          let allproduct=await ProductCasero.listaProductos();
          var resultado;    
          var array = [];
          for (var i = 0; i < allproduct.length; i++) {
              var igual=false;
               for (var j = 0; j < ids.length & !igual; j++) {
                   if(allproduct[i]['id'] == ids[j]['id']) 
                           igual=true;
               }
              if(!igual)array.push(allproduct[i]);
          }
          for (const element of array) {
            let a={
              estado:0
            }
            Object.assign(element,a)
          }
            resultado=array.concat(aniadidos);
         } else {
          let allproduct=await ProductCasero.listaProductos();
          for (const element of allproduct) {
            let a={
              estado:0
            }
            Object.assign(element,a);
          }
          resultado=allproduct;
         }

            res.send({ success: true, message: "succesfully !!",data:resultado });
         
        } else {
          res.send({ success: false, message: "bad request !!" });
        }
      }
    }

  
  
  module.exports = new ProductCaseroController();
  