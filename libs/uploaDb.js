const User = require('./../app/dao/User');
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
  destination:(req, file, cb)=>{
      cb(null, './db');
  },
  filename:(req, file, cb)=>{
      cb(null, file.originalname);
  }
});
const middlewareSubida = multer({storage});

class uploadDb {

  upload(req, res, next) {
    let _ = req.body;
    const subida = middlewareSubida.single('file');

    subida(req, res, (err) => {
      if (err) return next(err);
      let ruta = `${req.hostname}/${req.file.path}`;

      let splits = req.file.path.split("/",2);
      let resga = splits[1].split("-",1);
      let id_usuario = resga[0];

      User.upserDb(ruta, id_usuario);
      res.send({success:true});
    });
  }
}

module.exports = new uploadDb();