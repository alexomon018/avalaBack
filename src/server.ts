//create basic server
const express = require("express");
const app = express();
const port = 3000;

//create a route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
