const express = require('express');
const NivelService =  require('../service/nivel')

function nivelApi(app){
	const router = express.Router();
	app.use("/api/nivel",router);

	const nivelService = new NivelService();

	router.get("/",async function(req, res, next){
		try{
			const niveles = await nivelService.getNiveles();
			res.status(200).json({
				data: niveles,
				message:"niveles listados"
			})
		} catch(err){
			next(err)
		}
	});

	router.get("/:nid_nivel",async function(req, res, next){
		const { nid_nivel } = req.params;
		try{
			const niveles = await nivelService.getNivelBYyId( { nid_nivel } );
			res.status(200).json({
				data: niveles,
				message:"nivel obtenido"
			})
		} catch(err){
			next(err)
		}
	});
}

module.exports = nivelApi;