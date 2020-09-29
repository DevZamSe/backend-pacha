const db = require("./../../common/db/mysqldb");

class User {
  async login(email, pass) {
    console.log(arguments);
    let query = `select * from clientes where email = ? and pass = ?`;
    let params = [email, pass];
    let result = await db.query(query, params);

    return result;
  }
  async Active(id,msg,token){
    
    let query = `insert into active(id,tipo,token) values(?,?,?)`;
    let params = [id,msg,token];
    let result = await db.query(query, params);

    return result;
  }

  async updateTokenUser(id_cliente, token) {
    console.log(arguments);
    let query = `update clientes set token = ? where id_cliente = ?`;
    let params = [token, id_cliente];
    let result = await db.query(query, params);

    return result;
  }

  async updateToken(tokens, token) {
    console.log(arguments);
    let query = `update clientes set token = ? where token = ?`;
    let params = [tokens, token];
    let result = await db.query(query, params);

    return result;
  }
  async registroUsuario(
    nombre,
    email,
    direccion,
    lat,
    long,
    referencia,
    pass,
    token,
    tipo_cliente
  ) {
    let query = `insert into clientes(nombre,email,direccion,lat,lon,referencia,pass,token,tipo_cliente)values(?,?,?,?,?,?,?,?,?)`;
    let params = [
      nombre,
      email,
      direccion,
      lat,
      long,
      referencia,
      pass,
      token,
      tipo_cliente
    ];
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
  async datos(token){
    let query = `select id,token,nombre,email,direccion,lat,lon,tipo_cliente,referencia from clientes where token = ?`;
    let params = [token];
    let result = await db.query(query, params);

    return result;
  }
}

module.exports = new User();
