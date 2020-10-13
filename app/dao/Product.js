const db = require("./../../common/db/mysqldb");

class Product {
  //     async addProduct(id_usuario, nombre, precio, categoria, marca, stock, imagen, descripcion) {
  //         console.log(arguments);
  //         let query = `insert into producto (id_usuario, nombre, precio, categoria, marca, stock, imagen, descripcion) values(?,?,?,?,?,?,?,?)`;
  //         let params = [id_usuario, nombre, precio, categoria, marca, stock, imagen, descripcion];
  //         let result = await db.query(query, params);

  //         return result;
  //     }

  async personasActual(ingreso,salida,id_mercado){
    let query = `update mercados set cola=?, actual=? where id=?`;
    let params = [ingreso,salida,id_mercado];
    let result = await db.query(query, params);

    return result;
  }
  async cantidadExacta(id_mercado){

    let query = `select cola,actual from mercados where id = ?`;
    let params = [id_mercado];
    let result = await db.query(query, params);

    return result;
  }
  async validar_token(token) {
    console.log(arguments);
    let query = `select token from clientes where token = ?`;
    let params = [token];
    let result = await db.query(query, params);

    return result;
  }
  
  async todosMercados() {
    console.log(arguments);
    let query = `select * from mercados`;
    let params = [];
    let result = await db.query(query, params);

    return result;
  }

  async categoriasxmercado(id_mercado) {
    console.log(arguments);
    let query = `select t1.id,t1.nombre,t1.img from categorias as t1 inner JOIN detalle_mercado as t2 on t1.id=t2.id_categoria INNER JOIN mercados as t3 on t2.id_mercado=t3.id where t3.id=?`;
    let params = [id_mercado];
    let result = await db.query(query, params);

    return result;
  }
  async caserosxcategoria(id_mercado){
  
    let query = `select t1.id,t1.nombre,t1.img,t2.id_categoria,t2.numero from caseros as t1 INNER JOIN puestos as t2 on t1.id=t2.casero INNER JOIN mercados as t3 on t2.mercado=t3.id  where  t3.id=?`;
    let params = [id_mercado];
    let result = await db.query(query, params);

    return result;
  }
  
  async productosxpuesto(id_casero){
    let query = `SELECT t4.id,t4.nombre,t4.precio,t4.img,t4.validate,t4.aniadido from caseros as t1 INNER JOIN puestos as t2 on t1.id=t2.casero INNER JOIN detalle_producto as t3 on t2.id=t3.id_puesto INNER join productos as t4 on t3.id_producto=t4.id where t1.id=?`;
    let params = [id_casero];
    let result = await db.query(query, params);

    return result;
  }
  async detalleProducto(id_producto){
    let query = `select * from productos where id=?`;
    let params = [id_producto];
    let result = await db.query(query, params);

    return result;
  }
  async encontrarid(token){
    let query = `select id from clientes where token=?`;
    let params = [token];
    let result = await db.query(query, params);

    return result;
  }
  async agregarFavorito(id_producto, id_cliente, estado){
    let query = `insert into favoritos(id_cliente,id_producto,estado) values(?,?,?)`;
    let params = [id_cliente, id_producto, estado]
    let result = await db.query(query, params)

    return result
  }
  async eliminarFavorito(id_cliente, id_producto){
    let query = `delete from favoritos where id_cliente=? and id_producto=?`
    let params = [id_cliente, id_producto]
    let result = await db.query(query, params)

    return result;
  }
  async agregarlista(id,texto){
    let query = `insert into listas(cliente,titulo) values(?,?)`;
    let params = [id,texto];
    let result = await db.query(query, params);

    return result;
  }
  async updatelistas(titulo,id,id_cliente){
    let query = `update listas set titulo=? where id=? and cliente=?`;
    let params = [titulo,id,id_cliente];
    let result = await db.query(query, params);

    return result;
  }
  async deleteproductoslista(id_lista,id_prepedido){
    let query = `delete from detalle_lista where id_lista=? and id_prepedido=?`;
    let params = [id_lista,id_prepedido];
    let result = await db.query(query, params);

    return result;
  }
  async deleteprepedidolista(id_prepedido){
    let query = `delete from prepedido where id_prepedido=?`;
    let params = [id_prepedido];
    let result = await db.query(query, params);

    return result;
  }
 
  async cantidadLista(id){
    let query=`SELECT * FROM listas where cliente=?`;
    let params = [id];
    let result = await db.query(query, params);

    return result;
  }
  async agregarprepedido(id_producto,cantidad,id_cliente){
    let query = `insert into prepedido(id_producto,cantidad,id_cliente) values(?,?,?)`;
    let params = [id_producto,cantidad,id_cliente];
    let result = await db.query(query, params);

    return result;
  }
  async agregaralista(idlista,idpre){
    let query = `insert into detalle_lista(id_lista,id_prepedido) values(?,?)`;
    let params = [idlista,idpre];
    let result = await db.query(query, params);

    return result;
  }
  async findippre(id_producto,cantidad){
    let query = `select id_prepedido from prepedido where id_producto=? and cantidad=?`;
    let params = [id_producto,cantidad];
    let result = await db.query(query, params);

    return result;
  }
  
  async mislistas(id){
    let query = `select * from listas where cliente=?`;
    let params = [id];
    let result = await db.query(query, params);

    return result;
  }
  async misproductosxlista(id_lista,id){
    let query = `select t1.id,t1.titulo,t1.fecha,t2.id_prepedido,t3.cantidad,t4.id,t4.nombre,t4.precio,t4.peso from listas as t1 INNER JOIN detalle_lista as t2 on t1.id=t2.id_lista INNER JOIN prepedido as t3 on t2.id_prepedido=t3.id_prepedido INNER JOIN productos as t4 on t3.id_producto=t4.id where t1.id=? and t1.cliente=?`;
    let params = [id_lista,id];
    let result = await db.query(query, params);

    return result;
  }
  async categoriasRecetas(){
    let query = `select * from categoria_recetas`;
    let params = [];
    let result = await db.query(query, params);

    return result;
  }
  async recetas(id_categoria){
    let query = `select * from recetas where categoria=?`;
    let params = [id_categoria];
    let result = await db.query(query, params);

    return result;
  }
  async detalleReceta(id_receta){
    let query = `select t1.id,t1.nombre,t1.preparacion,t1.foto,t2.id_prepedido,t3.cantidad,t4.id,t4.nombre,t4.precio,t4.peso from recetas as t1 INNER JOIN detalle_recetas as t2 on t1.id=t2.id_receta INNER JOIN prepedido as t3 on t2.id_prepedido=t3.id_prepedido INNER JOIN productos as t4 on t3.id_producto=t4.id where t1.id=?`;
    let params = [id_receta];
    let result = await db.query(query, params);

    return result;
  }
  async aforo(id_mercado){
    let query = `select * from mercados where id=?`;
    let params = [id_mercado];
    let result = await db.query(query, params);

    return result;
  }
  async encontrarpre(id_lista){
    let query = `select id_prepedido from detalle_lista where id_lista=?`;
    let params = [id_lista];
    let result = await db.query(query, params);

    return result;
  }
  async eliminarprepedidos(id_prepedido){
    let query = `delete from prepedido where id_prepedido=?`;
    let params = [id_prepedido];
    let result = await db.query(query, params);

    return result;
  }
  async eliminarlista(id_lista){
    let query = `delete from listas where id=?`;
    let params = [id_lista];
    let result = await db.query(query, params);

    return result;
  }
  async eliminardeDetallelista(id_lista){
    let query = `delete from detalle_lista where id_lista=?`;
    let params = [id_lista];
    let result = await db.query(query, params);

    return result;
  }

}

module.exports = new Product();
