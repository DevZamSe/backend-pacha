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
  async categoriaservicio(filtro) {
    console.log(arguments);
    let query = `select t1.cod_servicio,t1.nombre_servicio,t1.duracion,t1.precio,t1.foto,t1.promedio from servicio as t1 inner join categoria as t2 on t1.cod_categoria=t2.cod_categoria where t1.cod_categoria=?`;
    let params = [filtro];
    let result = await db.query(query, params);

    return result;
  }
  async categoriapeluquerias(filtro) {
    console.log(arguments);
    let query = `select t1.cod_peluqueria,t1.nombre,t1.direccion,t1.foto_Centro,t1.promedio from peluqueria as t1 inner join peluqueria_categoria as t2 on t1.cod_peluqueria=t2.cod_peluqueria inner join categoria as t3 on t2.cod_categoria=t3.cod_categoria where t3.cod_categoria=?`;
    let params = [filtro];
    let result = await db.query(query, params);

    return result;
  }
  async productosxpuesto(){
    let query = `SELECT t1.id,t1.nombre,t1.precio,t1.img,t1.categoria,t1.favorito from categorias as t0 inner join productos as t1 on t0.id=t1.categoria INNER JOIN detalle_producto as t2 on t1.id=t2.id_producto inner join puestos as t3 on t2.id_puesto inner join caseros as t4 on t3.casero=t4.id`;
    let params = [];
    let result = await db.query(query, params);

    return result;
  }
  
}

module.exports = new Product();
