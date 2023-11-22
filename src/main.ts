import bodyParser from "body-parser";
import express from "express";
const cors = require("cors");
import { config } from "./config";
import { routes } from "./Producto/infrastructure/RouteUser";
import "dotenv/config";
import { rateLimit } from "express-rate-limit";
const https = require('https');
const fs = require('fs');

const app = express();


const accountLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 10, 
  message: "Demasiados intentos, por favor espera 10 minutos.",
});

app.use(cors());
app.use(bodyParser.json());
app.use("/Users",accountLimiter, routes);

const { port } = config.server;

app.listen(port, () => {
  console.log(`[APP] - corriendo puerto ${port}`);
});


https.createServer({
  cert: fs.readFileSync('/etc/letsencrypt/archive/api.caossoft.com/fullchain1.pem'),
  key: fs.readFileSync('/etc/letsencrypt/archive/api.caossoft.com/privkey1.pem')
}, app).listen(port, function () {
  console.log('Servidor https corriendo en el puerto 443');
})
app.get('/', function (req, res) {
  res.send('Hola, estas en la pagina inicial');
  console.log('Se recibio una petición get a través de https');
});

