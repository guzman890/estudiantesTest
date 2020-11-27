const express = require('express');
const PersonaService =  require('../service/persona')

function personaApi(app){
	const router = express.Router();
	app.use("/api/persona",router);

	const personaService = new PersonaService();

	router.get("/",async function(req, res, next){
		try{
			const personas = await personaService.getPersonas();
			res.status(200).json({
				data: personas,
				message:"personas listados"
			})
		} catch(err){
			next(err)
		}
	});

	router.get("/:nid_persona",async function(req, res, next){
		const { nid_persona } = req.params;
		try{
			const personas = await personaService.getPersonaById( { nid_persona } );
			res.status(200).json({
				data: personas,
				message:"persona obtenido"
			})
		} catch(err){
			next(err)
		}
    });
    
    router.post("/",async function(req, res, next){
		const { body:persona } = req;
		try{
			const personas = await personaService.createPersona( { persona } );
			res.status(200).json({
				data: personas,
				message:"persona creada"
			})
		} catch(err){
			next(err)
		}
	});

	router.put("/:nid_persona",async function(req, res, next){
		const { nid_persona } = req.params;
		const { body:persona } = req;
		try{
			const personas = await personaService.updatePersonaById( { nid_persona, persona } );
			res.status(200).json({
				data: personas,
				message:"persona actualizada"
			})
		} catch(err){
			next(err)
		}
	});
}

module.exports = personaApi;