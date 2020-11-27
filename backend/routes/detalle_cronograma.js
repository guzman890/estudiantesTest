const express = require('express');
const Detalle_cronogramaService =  require('../service/detalle_cronograma')

function Detalle_cronogramaApi(app){
	const router = express.Router();
	app.use("/api/detalle_cronograma",router);

	const detalle_cronogramaService = new Detalle_cronogramaService();

	router.get("/cronograma/:id_cronograma",async function(req, res, next){
		const { id_cronograma } = req.params;

		try{
			const detalle_cronogramas = await detalle_cronogramaService
												.getDetalle_cronogramasByIdCronograma({ id_cronograma });
			res.status(200).json({
				data: detalle_cronogramas,
				message:"detalle_cronogramas listados"
			})
		} catch(err){
			next(err)
		}
	});
}

module.exports = Detalle_cronogramaApi;