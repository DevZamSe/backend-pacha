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
      async actualizarCasero(nombre,email,ruc,direccion,id){
        let query = `update caseros set nombre=?,email=?,ruc=?,direccion=? where id=? `;
        let params = [nombre,email,ruc,direccion,id];
        let result = await db.query(query, params);
    
        return result; 
      }
      async actualizarPuesto(nombre_puesto,tipo_producto,id_puesto){
        let query = `update puestos set numero=?, id_categoria=? where id=?`;
        let params = [nombre_puesto,tipo_producto,id_puesto];
        let result = await db.query(query, params);
    
        return result;
      }
      async pedidosxid(id){
        let query = `select t1.id,t1.nombre,t2.fecha from clientes as t1 INNER JOIN ventas as t2 on t1.id=t2.cliente INNER JOIN listas as t3 on t2.id_lista=t3.id INNER JOIN detalle_lista as t4 on t3.id=t4.id_lista INNER JOIN prepedido as t5 on t4.id_prepedido=t5.id_prepedido INNER JOIN productos as t6 on t5.id_producto=t6.id INNER JOIN detalle_producto as t7 on t6.id=t7.id_producto INNER JOIN puestos as t8 on t7.id_puesto=t8.id where t8.casero=?`;
        let params = [id];
        let result = await db.query(query, params);
        
        return result;
      }
      async productosxcategoria(){
        let query = `select * from categorias`;
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
      let query = `select t1.id,t1.nombre,t1.img,t2.empresa,t2.horario,t2.id_categoria from caseros as t1 INNER JOIN puestos as t2 on t1.id=t2.casero INNER JOIN categorias as t3 on t2.id_categoria=t3.id where token=?`;
      let params = [token];
      let result = await db.query(query, params);
      
      return result;
    }
    async milistaProductos(id){
      let query = `select t1.id,t1.empresa,t1.id_categoria,t3.id,t3.nombre,t3.precio,t3.peso,t3.img from puestos as t1 INNER JOIN detalle_producto as t2 on t1.id=t2.id_puesto inner join productos as t3 on t2.id_producto=t3.id where t1.casero=? `;
      let params = [id];
      let result = await db.query(query, params);
      
      return result;
    }
  
  }
  
  module.exports = new ProductCasero();
  