const express = require("express");
const router = express.Router();

const UserController = require("./../app/controllers/UserController");
const ProductController = require("./../app/controllers/ProductController");
const CaseroController = require("./../app/controllers/CaseroController");
const ProductCaseroController = require("./../app/controllers/ProductCaseroController");
const AdminController = require("./../app/controllers/AdminController");

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
router.get("/mercados/nombres", ProductController.todosMercadosxid);
router.post("/pacha/iot/mercados", ProductController.personasActual);
router.post("/mercado/categorias", ProductController.categoriasxmercado);
router.post("/product/detalleProducto", ProductController.detalleProducto);
router.post("/mercado/aforo", ProductController.aforo);
router.post("/mercado/puestos", ProductController.mercadoxpuesto);
router.post("/categorias/caseros", ProductController.caserosxcategoria);
router.post("/product/productosxpuesto", ProductController.productosxpuesto);
router.post("/product/agregarFavoritoProducto", ProductController.agregarFavoritoProducto);
//router.post("/product/agregarlista", ProductController.agregarlista);
router.post("/product/eliminarlista", ProductController.eliminarlista);
router.post("/product/agregaralista", ProductController.agregaralista);
router.post("/venta/registrarVenta", ProductController.registrarVenta);
router.post("/product/updatealista", ProductController.updatealista);
router.post("/product/deleteproductoslista", ProductController.deleteproductoslista);
router.post("/product/agregarFavoritoCasero", ProductController.agregarFavoritoCasero);
router.post("/mercado/misListas", ProductController.mislistas);
router.post("/listas/misproductos", ProductController.misproductosxlista);
router.post("/recetas/categorias", ProductController.categoriasRecetas);
router.post("/recetas/recetasxCategoria", ProductController.recetas);
router.post("/recetas/detalleReceta", ProductController.detalleReceta);

//router.post("/mercado/misRecetas", ProductController.misrecetas);


// COMERCAINTES Routes
router.post("/casero/insertarCasero", CaseroController.registroCasero);
router.post("/casero/datos", CaseroController.datosCasero);
router.post("/mercados/publico", CaseroController.mercados);




router.post("/casero/perfil", ProductCaseroController.perfilCasero);
router.post("/casero/updateApodo", ProductCaseroController.updateApodo);

router.post("/Miempresa/datos", ProductCaseroController.datosmiempresa);
router.post("/Miempresa/update", ProductCaseroController.actualizarpuesto);


router.post("/categoria/listaCategorias", ProductCaseroController.listaCategorias);
router.post("/categoria/productosPedido", ProductCaseroController.productosxcategoria);


router.post("/abastecimiento/categorias", ProductCaseroController.abastecimientoCategorias);
router.post("/abastecimiento/Productos", ProductCaseroController.listaProductos);

//router.post("/productos/abastecimiento", ProductCaseroController.abastecimiento);
router.post("/abastecimiento/guardarenAlmacen", ProductCaseroController.abastecimientoProduct);


//almacen
router.post("/almacen/milistaProductos", ProductCaseroController.milistaProductos);
router.post("/almacen/updateprecio", ProductCaseroController.updatePrecio);
router.post("/almacen/eliminarProducto", ProductCaseroController.eliminarProducto);



router.post("/puesto/pedidos", ProductCaseroController.pedidosxid);
router.post("/puesto/detallePedido", ProductCaseroController.detallePedido);
router.post("/puesto/updatePedidos", ProductCaseroController.updatePedidos);

//--------------------------------------------------------------------------------------------------
router.post("/admin/login", AdminController.login);
router.post("/admin/aforo", AdminController.aforoLima);
router.post("/admin/aforo/mercadoid", AdminController.mercadoid);
router.post("/admin/aforoLimaFechas", AdminController.aforoLimaFechas);
router.post("/admin/temperatura", AdminController.temperatura);
router.post("/admin/temperatura/fechas", AdminController.temperaturaFechas);
router.get("/admin/ip", AdminController.ip);








module.exports = router;
