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
  
    let query = `select t1.id,t1.nombre,t1.img,t5.id as id_categoria,t2.numero from caseros as t1 INNER JOIN puestos as t2 on t1.id=t2.casero INNER JOIN mercados as t3 on t2.mercado=t3.id INNER JOIN detalle_mercado as t4 on t3.id=t4.id_mercado INNER join categorias as t5 on t4.id_categoria=t5.id where  t3.id=?`;
    let params = [id_mercado];
    let result = await db.query(query, params);

    return result;
  }
  
  async productosxpuesto(id_casero){
    let query = `SELECT t0.nombre,t1.id,t1.nombre,t1.precio,t1.img,t1.validate,t1.aniadido from categorias as t0 inner join productos as t1 on t0.id=t1.categoria INNER JOIN detalle_producto as t2 on t1.id=t2.id_producto inner join puestos as t3 on t2.id_puesto inner join caseros as t4 on t3.casero=t4.id where t4.id=?`;
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

    return result
  }
  async agregarlista(id,tipo){
    let query = `insert into listas(cliente,id_tipo) values(?,?)`;
    let params = [id,tipo];
    let result = await db.query(query, params);

    return result;
  }
  async agregarprepedido(id_producto,cantidad,precio){
    let query = `insert into prepedido(id_producto,cantidad,precio) values(?,?,?)`;
    let params = [id_producto,cantidad,precio];
    let result = await db.query(query, params);

    return result;
  }
  async agregaralista(idlista,idpre){
    let query = `insert into detalle_lista(id_lista,id_prepedido) values(?,?)`;
    let params = [idlista,idpre];
    let result = await db.query(query, params);

    return result;
  }
  async findippre(id_producto,cantidad,precio){
    let query = `select id_prepedido from prepedido where id_producto=? and cantidad=? and precio=?`;
    let params = [id_producto,cantidad,precio];
    let result = await db.query(query, params);

    return result;
  }
  async encontrarlista(token){
    let query = `select id from clientes where token=?`;
    let params = [token];
    let result = await db.query(query, params);

    return result;
  }
  async mislistas(tipo_lista,id){
    let query = `select * from listas where id_tipo=? and cliente=?`;
    let params = [tipo_lista,id];
    let result = await db.query(query, params);

    return result;
  }
  
}

module.exports = new Product();
