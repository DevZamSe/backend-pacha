const express = require("express");
const router = express.Router();

const UserController = require("./../app/controllers/UserController");
const ProductController = require("./../app/controllers/ProductController");
const CaseroController = require("./../app/controllers/CaseroController");
const ProductCaseroController = require("./../app/controllers/ProductCaseroController");

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
router.post("/mercado/aforo", ProductController.aforo);
router.post("/categorias/caseros", ProductController.caserosxcategoria);
router.post("/product/productosxpuesto", ProductController.productosxpuesto);
router.post("/product/agregarlista", ProductController.agregarlista);
router.post("/product/eliminarlista", ProductController.eliminarlista);
router.post("/product/agregaralista", ProductController.agregaralista);
router.post("/product/updatealista", ProductController.updatealista);
router.post("/product/deleteproductoslista", ProductController.deleteproductoslista);
router.post("/product/agregarFavorito", ProductController.agregarFavorito);
router.post("/mercado/misListas", ProductController.mislistas);
router.post("/listas/misproductos", ProductController.misproductosxlista);
router.post("/recetas/categorias", ProductController.categoriasRecetas);
router.post("/recetas/recetasxCategoria", ProductController.recetas);
router.post("/recetas/detalleReceta", ProductController.detalleReceta);

//router.post("/mercado/misRecetas", ProductController.misrecetas);


// COMERCAINTES Routes
router.post("/casero/insertarCasero", CaseroController.registroCasero);
router.post("/mercados/listaMercados", CaseroController.mercados);



router.post("/puesto/update", ProductCaseroController.actualizarpuesto);
router.post("/casero/perfil", ProductCaseroController.perfilCasero);


router.post("/categoria/listaCategorias", ProductCaseroController.listaCategorias);
router.post("/categoria/productosPedido", ProductCaseroController.productosxcategoria);
router.post("/almacen/milistaProductos", ProductCaseroController.milistaProductos);
router.post("/productos/abastecimiento", ProductCaseroController.abastecimiento);
router.post("/puesto/pedididos", ProductCaseroController.pedidosxid);







module.exports = router;
