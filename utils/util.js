const uuid = require("uuid");
const base62 = require("base62");

module.exports = {
 
    generateToken:function(){
        return uuid.v4();
    },
    base62Encode: function(x){
     return  base62.encode(x);
    },
    base62Decode: function(x){
        return  base62.Decode(x);
    }
    
}