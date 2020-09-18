const express = require("express");
const router = express.Router();

const UserController = require("./../app/controllers/UserController");
const ProductController = require("./../app/controllers/ProductController");
//User first

//User
router.get("/healthcheck", (req, res) => {
  res.send({ status: true });
});


router.post("/user/login", UserController.login);
router.post("/user/registroUsuario", UserController.registroUsuario);



//router.post("/user/changuePass", UserController.changuePass);

router.post("/mercado/categorias", ProductController.categoriasxmercado);
router.post("/product/productosxpuesto", ProductController.productosxpuesto);
router.post("/product/detalleProducto", ProductController.detalleProducto);
router.post("/categorias/caseros", ProductController.caserosxcategoria);




module.exports = router;
