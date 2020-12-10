const db = require("./../../common/db/mysqldb");

class Admin{
    async login(email, pass) {
        console.log(arguments);
        let query = `select * from admin where correo = ? and pass = ?`;
        let params = [email, pass];
        let result = await db.query(query, params);
    
        return result;
      }
      async validar_token(token) {
        console.log(arguments);
        let query = `select token from admin where token = ?`;
        let params = [token];
        let result = await db.query(query, params);
    
        return result;
      }
      async updateToken(tokens, token) {
        console.log(arguments);
        let query = `update admin set token = ? where token = ?`;
        let params = [tokens, token];
        let result = await db.query(query, params);
    
        return result;
      }
      async aforoActual(){
        let query = `SELECT id,nombre,aforo,actual from mercados`;
        let params = [];
        let result = await db.query(query, params);
    
        return result;
      }
      async aforoporDia(){
        let query = `SELECT t1.nombre,t2.* from mercados as t1 inner join historial as t2 on t1. id=t2.id where hora BETWEEN CURRENT_DATE and CURRENT_DATE+1`;
        let params = [];
        let result = await db.query(query, params);
    
        return result;  
      }
      async max(id){
        let query = `SELECT id,max(actual) as max,hora as hora1 from historial where hora BETWEEN CURRENT_DATE and CURRENT_DATE+1 and id=?`;
        let params = [id];
        let result = await db.query(query, params);
    
        return result;  
      }
      async min(id){
        let query = `SELECT id,min(actual) as min ,hora as hora2 from historial where hora BETWEEN CURRENT_DATE and CURRENT_DATE+1 and id=?`;
        let params = [id];
        let result = await db.query(query, params);
    
        return result;  
      }
      
      async suma(id){
        let query = `SELECT sum(actual) as totaldia from historial where hora BETWEEN CURRENT_DATE and CURRENT_DATE+1 and id=?`;
        let params = [id];
        let result = await db.query(query, params);
    
        return result;  
      }
      async aforoLimaFechas(fecha1,fecha2){
        let query = `select t1.nombre,t2.* from historial where hora between ? and ? `;
        let params = [fecha1,fecha2];
        let result = await db.query(query, params);
    
        return result;    
      }
      async mercadoid(id_mercado){
        let query = `select id,nombre,horario,direccion,actual,aforo from mercados where id=? `;
        let params = [id_mercado];
        let result = await db.query(query, params);
    
        return result;    
      }
      

}
module.exports=new Admin();