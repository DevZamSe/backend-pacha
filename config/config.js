module.exports.CONFIGURATIONS = {
    DATABASE : {
        MYSQL:{
         HOST : process.env.MYSQL_HOST || "mysql-abelheredia.alwaysdata.net",
         USER : process.env.MYSQL_USER || "208294_admin",
         PASSWORD : process.env.MYSQL_PASSWORD || "8Gyr9L@qmgWe2N4",
         DATABASE : process.env.MYSQL_DATABASE|| "abelheredia_pacha"
        }
    }
}