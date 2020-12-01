const Product = require("../dao/Product");
const User = require("../dao/User");
const util = require("./../../utils/util");

class ProductController {

  async personasActual(req,res){
    let _ = req.body;
    if ('202fef8b-dfe6-4f1d-b667-4d698b9c0585'==_.token && _.ingreso == _.temperatura.length) {

        let [{id}]=await Product.mercadoId(_.nombre_mercado);
          console.log("el id es "+id);
          console.log("han entrado "+_.ingreso);
          console.log("han salido "+_.salida)
        if (id!=null) {
        let [{aforo,actual}] = await Product.cantidadExacta(id);
        let i = parseInt(_.ingreso);
        let o = parseInt(_.salida);
        let total = actual + i - o;


          if(total<aforo && total>0){
          await Product.personasActual(total, id);
          let datos=_.temperatura;
          for (const element of datos) {
            await Product.insertTemperatura(id,element);
          }
  
          let [{prom}] = await Product.promTemperatura(id);
          await Product.updateTemperatura(prom, id);
          
          let a=[];
          a.push({total});
          a.push({aforo});
          a.push({prom});
           console.log(a);;  
          res.send({ success: true, message: "succesfully !!",data:a});
        } else {
          res.send({ success: false, message: "Calibrar Sensor" });
        }

      }else{
        res.send({ success: false, message: "bad request !!" });
      }
     
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
    async todosMercadosxid(req,res){
    let _ = req.body;
    
        let resultado = await Product.todosMercadosxid();

        res.send({ success: true, message: "succesfully !!", data: resultado });
    
    
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
      let [{id}]=await Product.encontrarid(_.token);
      var resultado;
      let listafavorito=await Product.listaFavoritosCaseros(_.id_mercado,id);
      let todos=await Product.caserosxcategoria(_.id_mercado);
      if (listafavorito!=null) {
        var array = [];
        for (var i = 0; i < todos.length; i++) {
            var igual=false;
             for (var j = 0; j < listafavorito.length & !igual; j++) {
                 if(todos[i]['id'] == listafavorito[j]['id']) 
                         igual=true;
             }
            if(!igual)array.push(todos[i]); 
        }
        for (const element of array) {
          let a={
            estado:0
          }
          Object.assign(element,a)
        }
        resultado=array.concat(listafavorito);   
      } else {
        resultado = todos;
      }
     
        res.send({ success: true, message: "succesfully !!", data: resultado });
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
}
  async productosxpuesto(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);
    
    if ((result.length > 0)) {
      let [{id}]=await Product.encontrarid(_.token);
      var resultado;
      let todo=await Product.productosxpuesto(_.id_casero);
      let favoritos= await Product.listafavoritosProductos(id,_.id_casero);
     
      if (favoritos!=null) {
        var array = [];
        for (var i = 0; i < todo.length; i++) {
            var igual=false;
             for (var j = 0; j < favoritos.length & !igual; j++) {
                 if(todo[i]['id'] == favoritos[j]['id']) 
                         igual=true;
             }
            if(!igual)array.push(todo[i]); 
        }
        for (const element of array) {
          let a={
            estado:0
          }
          Object.assign(element,a)
        }
        resultado=array.concat(favoritos);   
      } else {
        
        resultado =todo; 
      }

        res.send({ success: true, message: "succesfully !!", data: resultado });
    
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
  async agregarFavoritoProducto(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    if ((result.length > 0)) {
     let [{id}]=await Product.encontrarid(_.token);
      if (_.estado==1) {
        await Product.agregarFavoritoProducto(_.id_producto,id);
      } else {
        if (_.estado==0) {
          await Product.eliminarFavoritoProducto(_.id_producto,id); 
        }
      }
      
      res.send({ success: true, message: "succesfully !!" });
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

  async agregaralista(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);
    
    let set = new Set();
    var ids=[], contenido = [], idspedido=[], nameCaseros=[], idPrecio=[];    
    if ((result.length > 0)) {
       let datos=_.datos;
       for (const element of datos) {
         set.add(element['id_casero']);
       }

       ids = [...set];
       for (const element of ids){
         var data = datos.filter(item => item['id_casero']===element);
         contenido.push(data);
        }

      let [{id}]=await Product.encontrarid(_.token);
      let cuenta= await Product.cantidadLista(id);
      let texto=`Lista de compras ${cuenta.length+1}`;

      for (const u of contenido){
        let [{id_puesto}] = await Product.idPuestobyCaasero(u[0]['id_casero']);
            
        let {insertId}=await Product.agregarlista(id,texto);
        let id_lista=insertId;  
        await Product.InsertListaPuesto(id_lista,id_puesto);
        var precio = 0;
        for (const element of u) {
          let {insertId}=await Product.agregarprepedido(element['id'],element['cantidad'],id);
          // idspedido.push(insertId);
          await Product.agregaralista(id_lista,insertId);
          precio = element['precio']*element['cantidad'] + precio;
        }
        idspedido.push(id_lista);
        nameCaseros.push(u[0]['nombre_casero']);
        idPrecio.push(precio);
      }
      res.send({ success: true, message: "succesfully !!",data:{"id_lista":idspedido, "name_caseros":nameCaseros, "precio":idPrecio}});
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

 
  async agregarFavoritoCasero(req, res){
    let _= req.body;
    let result = await Product.validar_token(_.token);

    if ((result.length > 0)) {
      let [{id}] = await Product.encontrarid(_.token);
     
      if(_.estado == 1) {
        await Product.agregarFavoritoCasero(_.id_casero, id,_.estado)
        res.send({ success: true, message: "succesfully !!"});
      } else {
        await Product.eliminarFavoritoCasero(id,_.id_casero)
        res.send({ success: true, message: "succesfully !!" });
      }
    } else {
      res.send({ success: false, message: "bad request !!" });
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
  async mercadoxpuesto(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    if ((result.length > 0)) {
     
      let resultado = await Product.mercadoxpuesto(_.id_puesto);
      console.log(resultado);
      
      if (resultado!=null) {
        res.send({ success: true, message: "succesfully !!",data:resultado });
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
  async registrarVenta(req,res){
    let _ = req.body;
    let result = await Product.validar_token(_.token);

    if (result.length > 0) {
     
      let [{id}]=await Product.encontrarid(_.token);
      console.log(id);
      if (_.tipo==1) {
        await Product.registrarVenta(_.fecha_entrega,_.horario,_.delivery,
          _.monto,_.montoFinal,_.id_transaccion,_.status,_.statusdetails,_.propina,_.tipo,id,_.id_lista);
      }else{
        if (_.tipo==2) {
          let deli=0;
          let propi=0;
          await Product.registrarVenta(_.fecha_entrega,_.horario,deli,
            _.monto,_.montoFinal,_.id_transaccion,_.status,_.statusdetails,propi,_.tipo,id,_.id_lista);
        }
      }

        res.send({ success: true, message: "succesfully !!"});
     
    } else {
      res.send({ success: false, message: "bad request !!" });
    } 
  }

}


module.exports = new ProductController();
