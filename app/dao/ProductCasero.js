const db = require("./../../common/db/mysqldb");
class ProductCasero {

    async validar_token(token) {
        console.log(arguments);
        let query = `select token from caseros where token = ?`;
        let params = [token];
        let result = await db.query(query, params);
    
        return result;
      }
      async encontrarid(token){
        let query = `select id from caseros where token = ?`;
        let params = [token];
        let result = await db.query(query, params);
    
        return result;
      }
      async IdPuestobytoken(token){
        let query = `select t1.id from puestos as t1 INNER join caseros as t2 on t1.casero=t2.id where t2.token=?`;
        let params = [token];
        let result = await db.query(query, params);
    
        return result; 
      }
      async datosmiempresa(token,id_puesto){
        let query = `select t1.nombre,t1.email,t2.empresa,t1.ruc,t3.nombre,t2.id as id_puesto,t2.numero,t6.id_categoria from caseros as t1 INNER JOIN puestos as t2 on t1.id=t2.casero INNER join mercados as t3 on t2.mercado=t3.id INNER join detalle_mercado as t4 on t3.id=t4.id_mercado INNER JOIN categorias as t5 on t4.id_categoria=t5.id INNER JOIN puesto_categorias as t6 on t5.id=t6.id_categoria where t1.token=? and t6.id_puesto=? `;
        let params = [token,id_puesto];
        let result = await db.query(query, params);
    
        return result;
      }
      async actualizarCasero(email,id){
        let query = `update caseros set email=? where id=? `;
        let params = [email,id];
        let result = await db.query(query, params);
    
        return result; 
      }
      async eliminarcategorias(id){
        let query = `delete from puesto_categorias where id_puesto=? `;
        let params = [id];
        let result = await db.query(query, params);
    
        return result; 
      }
      async actualizarPuesto(tipo_producto,id_puesto){
        let query = `insert into puesto_categorias(id_categoria,id_puesto) values (?,?)`;
        let params = [tipo_producto,id_puesto];
        let result = await db.query(query, params);
    
        return result;
      }
      async pedidosxid(id){
        let query = `SELECT t1.id,t1.img,t1.nombre,t2.id as id_venta,t2.fecha,t2.metodo_pago,t2.monto,t2.horario,t2.estado FROM clientes as t1 INNER JOIN ventas as t2 on t1.id=t2.cliente INNER JOIN puestos as t3 on t2.id_puesto=t3.id INNER JOIN caseros as t4 on t3.casero=t4.id where t4.id=? `;
        let params = [id];
        let result = await db.query(query, params);
        
        return result;
      }
      async encontraridLista(id_venta){
        let query = `select id_lista from ventas where id = ?`;
        let params = [id_venta];
        let result = await db.query(query, params);
    
        return result;
      }
      async detallePedido(id_lista){
        let query = `SELECT t1.id_prepedido,t3.nombre,t3.img,t2.cantidad,t4.precio,t3.unidad from detalle_lista as t1 INNER JOIN prepedido as t2 on t1.id_prepedido=t2.id_prepedido INNER JOIN productos as t3 on t2.id_producto=t3.id INNER JOIN detalle_almacen as t4 on t3.id=t4.id_producto where t1.id_lista=?`;
        let params = [id_lista];
        let result = await db.query(query, params);
        
        return result;
      }
      async updatePedidos(id_venta){
        let query = `update ventas set estado=1 where id=?`;
        let params = [id_venta];
        let result = await db.query(query, params);
        
        return result;
      }
      async listarPedidosEstado(id){
        let query = `SELECT t1.id,t1.img,t1.nombre,t2.id as id_venta,t2.fecha,t2.estado FROM clientes as t1 INNER JOIN ventas as t2 on t1.id=t2.cliente INNER JOIN puestos as t3 on t2.id_puesto=t3.id INNER JOIN caseros as t4 on t3.casero=t4.id where t4.id=?`;
        let params = [id];
        let result = await db.query(query, params);
        
        return result;
      }

      async productosxcategoria(id_categoria){
        let query = `select * from productos where categoria=?`;
        let params = [id_categoria];
        let result = await db.query(query, params);
        
        return result;
      }
    async crearpedido(id){
      let query = `insert into pedido(id_casero) values(?)`;
      let params = [id];
      let result = await db.query(query, params);
      
      return result;
    }
    async updatepedido(cantidad,total){
      let query = `insert into pedido(cantidad,total) values(?,?)`;
      let params = [cantidad,total];
      let result = await db.query(query, params);
      
      return result;
    }
    async perfilCasero(token){
      let query = `select t1.id,t1.nombre,t1.apodo,t1.img,t2.empresa,t2.horario,t3.id_categoria from caseros as t1 INNER JOIN puestos as t2 on t1.id=t2.casero inner join puesto_categorias as t3 on t2.id=id_puesto where t1.token=?`;
      let params = [token];
      let result = await db.query(query, params);
      
      return result;
    }
    async cantidadlikes(id){
      let query = `select count(t2.id_Casero) as likes from caseros as t1 inner join favoritos_puesto as t2 on t1.id=t2.id_casero where t2.id_casero=?`;
      let params = [id];
      let result = await db.query(query, params);
      
      return result;
    }
    async updateApodo(apodo,id){
      let query = `update caseros set apodo=? where id=?`;
      let params = [apodo,id];
      let result = await db.query(query, params);
      
      return result;
    }
    async encontraridAlmacen(id){
      let query = `SELECT t2.empresa,t3.id_almacen from puestos as t2 INNER JOIN almacen as t3 on t2.id=t3.id_puesto where t2.casero=? `;
      let params = [id];
      let result = await db.query(query, params);
      
      return result;
    }
    async IdAlmacenbytoken(token){
      let query = `SELECT id_almacen from caseros as t1 INNER JOIN puestos as t2 on t1.id=t2.casero INNER JOIN almacen as t3 on t2.id=t3.id_puesto where t1.token=? `;
      let params = [token];
      let result = await db.query(query, params);
      
      return result;
    }
    async updateprecio(precio,id_almacen,id_producto){
      let query = `UPDATE detalle_almacen set precio=? where id_almacen=? and id_producto=? `;
      let params = [precio,id_almacen,id_producto];
      let result = await db.query(query, params);
      
      return result;
    }
    async eliminarProducto(id_almacen,id_producto){
      let query = `delete from detalle_almacen where id_almacen=? and id_producto=? `;
      let params = [id_almacen,id_producto];
      let result = await db.query(query, params);
      
      return result;

    }
    async milistaProductos(id_almacen){
      let query = `SELECT t3.id,t3.nombre,t3.img,t3.unidad,t2.precio from detalle_almacen as t2 INNER JOIN productos as t3 on t2.id_producto=t3.id where t2.id_almacen=?`;
      let params = [id_almacen];
      let result = await db.query(query, params);
      
      return result;
    }
    async milistaProductosAbastecimiento(id_almacen){
      let query = `SELECT t3.id,t3.nombre,t3.img,t3.precio,t3.preciocompra,t3.beneficio,t3.contenido,t2.estado,t3.categoria,t3.unidad from detalle_almacen as t2 INNER JOIN productos as t3 on t2.id_producto=t3.id where t2.id_almacen=?`;
      let params = [id_almacen];
      let result = await db.query(query, params);
      
      return result;
    }
  async encontrarIdsProducto(id_almacen){
    let query = `SELECT t3.id from detalle_almacen as t2 INNER JOIN productos as t3 on t2.id_producto=t3.id where t2.id_almacen=?`;
    let params = [id_almacen];
    let result = await db.query(query, params);
    
    return result;
  }
    async listaProductos(){
      let query = `select id,nombre,img,precio,preciocompra,beneficio,contenido,categoria,unidad from productos`;
      let params = [];
      let result = await db.query(query, params);
      
      return result;
    }
    async abastecimientoCategorias(id){
      let query = `select t0.id,t0.nombre,t0.img from categorias as t0  INNER JOIN puesto_categorias as t1 on t0.id=t1.id_categoria inner join puestos as t2 on t1.id_puesto=t2.id where t2.casero=?`;
      let params = [id];
      let result = await db.query(query, params);
      
      return result;
    }
    async precioProducto(id_producto){
      let query = `select precio from productos where id=?`;
      let params = [id_producto];
      let result = await db.query(query, params);
      
      return result;
    }
    async abastecimientoProduct(id_almacen,id_producto,precio){
      let query = `insert into detalle_almacen(id_almacen,id_producto,precio,estado) values(?,?,?,1)`;
      let params = [id_almacen,id_producto,precio];
      let result = await db.query(query, params);
      
      return result;
    }
    async existealmacen(id){
      let query = `select id_almacen from almacen where id_puesto=?`;
      let params = [id];
      let result = await db.query(query, params);
      
      return result;
    }
    async encontraridPuesto(id){
      let query = `select id from puestos where casero=?`;
      let params = [id];
      let result = await db.query(query, params);
      
      return result;
    }
  
  }
  
  module.exports = new ProductCasero();
  