require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3100;
const api = require("./router/router");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", api);

app.listen(port, () => {
  console.log(`Server is running in por ${port}`);
});
