const db = require("./../../common/db/mysqldb");

class Casero {
  async login(email, pass) {
    console.log(arguments);
    let query = `select * from casero where email = ? and pass = ?`;
    let params = [email, pass];
    let result = await db.query(query, params);

    return result;
  }
  async registroCasero(
    nombre,
    email,
    pass,
    lat,
    long,
    ruc,
    token,
    apodo
  ) {
    let query = `insert into caseros(nombre,email,pass,lat,lon,ruc,token,apodo)values(?,?,?,?,?,?,?,?)`;
    let params = [
    nombre,
    email,
    pass,
    lat,
    long,
    ruc,
    token,
    apodo
     
    ];
    let result = await db.query(query, params);

    return result;
  }
  async registroPuesto(numero,empresa,id_mercado,id){
    let query = `insert into puestos(numero,empresa,mercado,casero)values (?,?,?,?) `;
    let params = [numero,empresa,id_mercado,id];
    let result = await db.query(query, params);

    return result;
  }
  async insertpuestoCategoria(id_categoria,id_puesto){
    let query = `insert into puesto_categorias(id_categoria,id_puesto)values (?,?)`;
    let params = [id_categoria,id_puesto];
    let result = await db.query(query, params);

    return result;
  }
  async validar_token(token) {
    console.log(arguments);
    let query = `select token from caseros where token = ?`;
    let params = [token];
    let result = await db.query(query, params);

    return result;
  }
  async datos(token){
    let query = `select t1.id,t1.token,t1.nombre,t1.img,t1.ruc,t1.lat,t1.lon,t2.id,t2.empresa,t2.numero,t3.id_categoria from caseros as t1 inner join puestos as t2 on t1.id=t2.casero inner join puesto_categorias as t3 on t2.id=t3.id_puesto where t1.token=?`;
    let params = [token];
    let result = await db.query(query, params);
    
    return result;
  }
  async crearAlmacen(id){
    let query = `insert into almacen(id_puesto) values(?)`;
    let params = [id];
    let result = await db.query(query, params);
    
    return result;
  }
  async mercados(){
    let query = `select id,nombre from mercados`;
    let params = [];
    let result = await db.query(query, params);
    
    return result;
  }

}

module.exports = new Casero();
