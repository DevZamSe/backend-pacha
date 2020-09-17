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

router.post("/product/productosxpuesto", ProductController.productosxpuesto);




module.exports = router;
