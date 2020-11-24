const db = require("./../../common/db/mysqldb");

class Product {
  async personasActual(total,id_mercado){
    let query = `update mercados set actual=? where id=?`;
    let params = [total, id_mercado];
    let result = await db.query(query, params);

    return result;
  }
  async mercadoId(nombre){
  let query = `select id from mercados where nombre=?`;
    let params = [nombre];
    let result = await db.query(query, params);

    return result;
  }
  async insertTemperatura(id_mercado,temperatura){
    let query = `insert into temperatura(id_mercado,temperatura) values(?,?)`;
    let params = [id_mercado,temperatura];
    let result = await db.query(query, params);

    return result;
  }
  async promTemperatura(id_mercado){
    let query = `select avg(temperatura) as prom from temperatura where id_mercado = ?`;
    let params = [id_mercado];
    let result = await db.query(query, params);

    return result;
  }  
  async updateTemperatura(prom, id){
    let query = `update mercados set temperatura=? where id=?`;
    let params = [prom, id];
    let result = await db.query(query, params);

    return result;
  }
  async cantidadExacta(id_mercado){
    let query = `select aforo,actual from mercados where id = ?`;
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
  async todosMercadosxid(){
      let query = `select nombre from mercados`;
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
  async listaFavoritosCaseros(id_mercado,id){
    console.log(arguments);
    let query = `SELECT DISTINCT t2.id,t2.nombre,t2.img,t3.numero,t4.id_categoria,t1.estado from favoritos_puesto as t1 INNER JOIN caseros as t2 on t1.id_casero=t2.id INNER JOIN puestos as t3 on t2.id=t3.casero INNER JOIN puesto_categorias as t4 on t3.id=t4.id_puesto INNER JOIN categorias as t5 on t4.id_categoria=t5.id where t3.mercado=? and t1.id_cliente=?`;
    let params = [id_mercado,id];
    let result = await db.query(query, params);

    return result;
  }
  async caserosxcategoria(id_mercado){
  
    let query = `select t1.id,t1.nombre,t1.img,t2.numero,t3.id_categoria,t2.mercado from caseros as t1 INNER JOIN puestos as t2 on t1.id=t2.casero INNER JOIN puesto_categorias as t3 on t2.id=t3.id_puesto INNER JOIN categorias as t4 on t3.id_categoria=t4.id  where t2.mercado=?`;
    let params = [id_mercado];
    let result = await db.query(query, params);

    return result;
  }
  
  async productosxpuesto(id_casero){
    let query = `SELECT t4.id,t4.nombre,t3.precio,t4.img from puestos as t1 INNER JOIN almacen as t2 on t1.id=t2.id_puesto INNER JOIN detalle_almacen as t3 on t2.id_almacen=t3.id_almacen INNER JOIN productos as t4 on t3.id_producto=t4.id where t1.casero=?`;
    let params = [id_casero];
    let result = await db.query(query, params);

    return result;
  }
  async listafavoritosProductos(id_cliente,casero){
    let query = `SELECT DISTINCT t2.id,t2.nombre,t3.precio,t2.img,t1.estado from favoritos as t1 INNER join productos as t2 on t1.id_producto=t2.id INNER JOIN detalle_almacen as t3 on t2.id=t3.id_producto INNER JOIN almacen as t4 on t3.id_almacen=t4.id_almacen INNER join puestos as t5 on t4.id_puesto=t5.id where t1.id_cliente=? and t5.casero=?`;
    let params = [id_cliente,casero];
    let result = await db.query(query, params);

    return result;
  }
  async agregarFavoritoProducto(id_producto,id_cliente){
    let query = `insert into favoritos(id_producto,id_cliente,estado) values (?,?,1)`;
    let params = [id_producto,id_cliente];
    let result = await db.query(query, params);

    return result;
  }async eliminarFavoritoProducto(id_producto,id_cliente){
    let query = `delete from favoritos where id_producto=? and id_cliente=?`;
    let params = [id_producto,id_cliente];
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
  // async encontraridpuesto(id){
  //   let query = `select id from clientes where token=?`;
  //   let params = [token];
  //   let result = await db.query(query, params);

  //   return result;
  // }
  async agregarFavoritoCasero(id_casero, id_cliente, estado){
    let query = `insert into favoritos_puesto(id_casero,id_cliente,estado) values(?,?,?)`;
    let params = [id_casero,id_cliente, estado]
    let result = await db.query(query, params)

    return result
  }
  async eliminarFavoritoCasero(id_cliente, id_casero){
    let query = `delete from favoritos_puesto where id_cliente=? and id_casero=?`
    let params = [id_cliente, id_casero]
    let result = await db.query(query, params)

    return result;
  }
  async idPuestobyCaasero(id_casero){
    let query = `select id as id_puesto from puestos where casero=?`
    let params = [id_casero]
    let result = await db.query(query, params)

    return result;
  }
  async agregarlista(id,texto,id_puesto){
    let query = `insert into listas(cliente,titulo,id_puesto) values(?,?,?)`;
    let params = [id,texto,id_puesto];
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
  async registrarVenta(fecha_entrega,horario,delivery,
    monto,montoFinal,id_transaccion,status,statusdetails,propina,tipo,id,id_lista){
      let query = `insert into ventas(fecha_entrega,horario,delivery,
        monto,montoFinal,id_transaccion,status,statusdetails,propina,tipo,id,id_lista) values(?,?,?,?,?,?,?,?,?,?,?,?)`;
      let params = [fecha_entrega,horario,delivery,
        monto,montoFinal,id_transaccion,status,statusdetails,propina,estado,tipo,id,id_lista];
      let result = await db.query(query, params);
  
      return result;
  }

}

module.exports = new Product();
