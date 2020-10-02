const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const connectdb = require("./db");
const PORT = process.env.PORT || 3000
const Router = require("express");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));





var routes = require("./routes/index");
app.use('/', routes);

connectdb();


app.listen(PORT ,()=>{
console.log("running gooddd....");
});
