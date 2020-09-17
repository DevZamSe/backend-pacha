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
    let query = `update cliente set token = ? where id_cliente = ?`;
    let params = [token, id_cliente];
    let result = await db.query(query, params);

    return result;
  }

  async updateToken(tokens, token) {
    console.log(arguments);
    let query = `update cliente set token = ? where token = ?`;
    let params = [tokens, token];
    let result = await db.query(query, params);

    return result;
  }

  async validarToken(token) {
    let query = `select * from cliente where token = ?`;
    let params = [token];
    let result = await db.query(query, params);

    return result;
  }

  async registroUsuario(
    nombres,
    apellidos,
    correo,
    genero,
    telefono,
    fecha_nacimiento,
    correo_opcional,
    pass,
    token,
    latitud,
    longitud
  ) {
    let query = `insert into cliente(nombres,apellidos,correo,genero,telefono,fecha_nacimiento,correo_opcional,pass,token,latitud,longitud) values(?,?,?,?,?,?,?,?,?,?,?)`;
    let params = [
      nombres,
      apellidos,
      correo,
      genero,
      telefono,
      fecha_nacimiento,
      correo_opcional,
      pass,
      token,
      latitud,
      longitud
    ];
    let result = await db.query(query, params);

    return result;
  }
}

module.exports = new User();
