const express = require('express');
const app = express();
var cors = require('cors')

app.use(cors())

app.use(express.json());

const { config } = require('./config/index');

const gradoApi              = require('./routes/grado')
const cronogramaApi         = require('./routes/cronograma')
const Detalle_cronogramaApi = require('./routes/detalle_cronograma')
const nivelApi              = require('./routes/nivel')
const personaApi            = require('./routes/persona')
const movimientoApi         = require('./routes/movimiento')

gradoApi(app);
cronogramaApi(app);
Detalle_cronogramaApi(app);
nivelApi(app);
personaApi(app);
movimientoApi(app);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});