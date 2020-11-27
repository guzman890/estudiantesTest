const express = require('express');
const GradoService =  require('../service/grado')

function gradoApi(app){
	const router = express.Router();
	app.use("/api/grado",router);

	const gradoService = new GradoService();

	router.get("/",async function(req, res, next){
		try{
			const grados = await gradoService.getGrados();
			res.status(200).json({
				data: grados,
				message:"grados listados"
			})
		} catch(err){
			next(err)
		}
	});

	router.get("/:nid_grado",async function(req, res, next){
		const { nid_grado } = req.params;
		try{
			const grados = await gradoService.getGradosById( { nid_grado } );
			res.status(200).json({
				data: grados,
				message:"grado obtenido"
			})
		} catch(err){
			next(err)
		}
	});
}

module.exports = gradoApi;
