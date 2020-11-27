const express = require('express');
const CronogramaService =  require('../service/cronograma')

function cronogramaApi(app){
	const router = express.Router();
	app.use("/api/cronograma",router);

	const cronogramaService = new CronogramaService();

	router.get("/",async function(req, res, next){
		try{
			const cronogramas = await cronogramaService.getCronogramas();
			res.status(200).json({
				data: cronogramas,
				message:"cronogramas listados"
			})
		} catch(err){
			next(err)
		}
	});

	router.get("/:id_cronograma",async function(req, res, next){
		const { id_cronograma } = req.params;
		try{
			const cronogramas = await cronogramaService.getCronogramaById( { id_cronograma } );
			res.status(200).json({
				data: cronogramas,
				message:"cronograma obtenido"
			})
		} catch(err){
			next(err)
		}
	});

	router.post("/",async function(req, res, next){
		const { body:cronograma } = req;
		try{
			const cronogramas = await cronogramaService.createCronograma( { cronograma } );
			res.status(200).json({
				data: cronogramas,
				message:"cronograma creada"
			})
		} catch(err){
			next(err)
		}
	});

	router.put("/:id_cronograma",async function(req, res, next){
		const { id_cronograma } = req.params;
		const { body:cronograma } = req;
		try{
			const cronogramas = await cronogramaService.updateCronogramaById( { id_cronograma, cronograma } );
			res.status(200).json({
				data: cronogramas,
				message:"cronograma actualizada"
			})
		} catch(err){
			next(err)
		}
	});
}

module.exports = cronogramaApi;