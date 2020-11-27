const express = require('express');
const MovimientoService =  require('../service/movimiento')

function movimientoApi(app){
	const router = express.Router();
	app.use("/api/movimiento",router);

	const movimientoService = new MovimientoService();

	router.get("/persona/:nid_persona",async function(req, res, next){
		const { nid_persona } = req.params;
		try{
			const movimientos = await movimientoService.getMovimientosByIdPersona({ nid_persona });
			res.status(200).json({
				data: movimientos,
				message:"movimientos listados"
			})
		} catch(err){
			next(err)
		}
	});

	router.get("/:id_movimiento",async function(req, res, next){
		const { id_movimiento } = req.params;
		try{
			const movimientos = await movimientoService.getMovimientoById( { id_movimiento } );
			res.status(200).json({
				data: movimientos,
				message:"movimiento obtenido"
			})
		} catch(err){
			next(err)
		}
	});

	router.post("/",async function(req, res, next){
		var { body:movimientos } = req;
		try{
			var movimientos = await movimientoService.createMovimiento( { movimientos } );
			res.status(200).json({
				data: movimientos,
				message:"movimiento creada"
			})
		} catch(err){
			next(err)
		}
	});

	router.put("/",async function(req, res, next){
		var { body:movimientos } = req;
		try{
			var movimientos = await movimientoService.updateMovimientoById( { movimientos } );
			res.status(200).json({
				data: movimientos,
				message:"movimiento actualizada"
			})
		} catch(err){
			next(err)
		}
	});
}

module.exports = movimientoApi;