const db = require("./../../common/db/mysqldb");

class Product {
  //     async addProduct(id_usuario, nombre, precio, categoria, marca, stock, imagen, descripcion) {
  //         console.log(arguments);
  //         let query = `insert into producto (id_usuario, nombre, precio, categoria, marca, stock, imagen, descripcion) values(?,?,?,?,?,?,?,?)`;
  //         let params = [id_usuario, nombre, precio, categoria, marca, stock, imagen, descripcion];
  //         let result = await db.query(query, params);

  //         return result;
  //     }
  async validar_token(token) {
    console.log(arguments);
    let query = `select token from clientes where token = ?`;
    let params = [token];
    let result = await db.query(query, params);

    return result;
  }
  async categoriasxmercado(id_mercado) {
    console.log(arguments);
    let query = `select t1.id,t1.nombre from categorias as t1 inner JOIN detalle_mercado as t2 on t1.id=t2.id_categoria INNER JOIN mercados as t3 on t2.id_mercado=t3.id where t3.id=?`;
    let params = [id_mercado];
    let result = await db.query(query, params);

    return result;
  }
  async caserosxcategoria(id_categoria){
  
    let query = `select t1.id,t1.nombre,t1.img from caseros as t1 INNER JOIN puestos as t2 on t1.id=t2.casero INNER JOIN categorias as t3 on t2.id_categoria=t3.id where t3.id=?`;
    let params = [id_categoria];
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
  
}

module.exports = new Product();
