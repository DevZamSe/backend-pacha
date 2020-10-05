const express = require("express");
const router = express.Router();

const UserController = require("./../app/controllers/UserController");
const ProductController = require("./../app/controllers/ProductController");

// User Routes
router.get("/healthcheck", (req, res) => {
  res.send({ status: true });
});
router.post("/user/login", UserController.login);
router.post("/user/registroUsuario", UserController.registroUsuario);
router.post("/user/datos", UserController.datos);
//router.post("/user/changuePass", UserController.changuePass);

// Product Routes
router.post("/mercados", ProductController.todosMercados);
router.post("/pacha/iot", ProductController.personasActual);
router.post("/mercado/categorias", ProductController.categoriasxmercado);
router.post("/product/detalleProducto", ProductController.detalleProducto);
router.post("/categorias/caseros", ProductController.caserosxcategoria);
router.post("/product/productosxpuesto", ProductController.productosxpuesto);
router.post("/product/agregarlista", ProductController.agregarlista);
router.post("/product/agregaralista", ProductController.agregaralista);
router.post("/product/agregarFavorito", ProductController.agregarFavorito);
router.post("/mercado/misListas", ProductController.mislistas);
//router.post("/mercado/misRecetas", ProductController.misrecetas);

module.exports = router;
