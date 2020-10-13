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
    token
  ) {
    let query = `insert into caseros(nombre,email,pass,lat,lon,ruc,token)values(?,?,?,?,?,?,?)`;
    let params = [
    nombre,
    email,
    pass,
    lat,
    long,
    ruc,
    token
     
    ];
    let result = await db.query(query, params);

    return result;
  }
  async registroPuesto(numero,empresa,id_mercado,id,categoria){
    let query = `insert into puestos(numero,empresa,mercado,casero,id_categoria)values (?,?,?,?,?) `;
    let params = [numero,empresa,id_mercado,id,categoria];
    let result = await db.query(query, params);

    return result;
  }
  async validar_token(token) {
    console.log(arguments);
    let query = `select token from casero where token = ?`;
    let params = [token];
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
