const  PostgresLib  = require('../lib/postgres')

class PersonaService{
    
    async getPersonas(){
        const postgresLib =PostgresLib.getInstance();
        //const personas = {"id":1,"persona": "SEG"}
        const personas = await postgresLib.conection()
                            .any('SELECT * FROM persona')
                            .then(function (data) {
                                return data
                            }).catch(function (err) {
                                return next(err);
                            });
        //console.log(personas)
        return personas || {};
    }

    async getPersonaById( { nid_persona } ){
        const postgresLib =PostgresLib.getInstance();
        
        const personas = await postgresLib.conection()
                            .any(`SELECT * FROM persona WHERE nid_persona = ${nid_persona}`)
                            .then(function (data) {
                                return data
                            }).catch(function (err) {
                                return next(err);
                            });
        
        return personas || {};
    }

    async createPersona( { persona } ){
        const postgresLib =PostgresLib.getInstance();
        const personas = await postgresLib.conection()
                                .query(`INSERT INTO persona (
                                            nom_persona, 
                                            ape_pate_pers, 
                                            ape_mate_pers, 
                                            nid_grado, 
                                            fecha_naci, 
                                            foto_ruta
                                        ) VALUES ( 
                                            '${persona.nom_persona}', 
                                            '${persona.ape_pate_pers}', 
                                            '${persona.ape_mate_pers}', 
                                            ${persona.nid_grado}, 
                                            '${persona.fecha_naci}', 
                                            '${persona.foto_ruta}'
                                        ) RETURNING nid_persona `)
                                .then(function (data) {
                                    return data
                                }).catch(function (err) {
                                    console.log(err)
                                    return next(err);
                                });
        
        return personas || {};
    }

    async updatePersonaById({ nid_persona, persona }){
        const postgresLib =PostgresLib.getInstance();
        
        const personas = await postgresLib.conection()
                                .query(`UPDATE persona SET 
                                            nom_persona = '${persona.nom_persona}',
                                            ape_pate_pers = '${persona.ape_pate_pers}', 
                                            ape_mate_pers = '${persona.ape_mate_pers}', 
                                            nid_grado = ${persona.nid_grado}, 
                                            fecha_naci = '${persona.fecha_naci}', 
                                            foto_ruta = '${persona.foto_ruta}'
                                        WHERE
                                            nid_persona = '${nid_persona}'
                                        RETURNING nid_persona `)
                                .then(function (data) {
                                    return data
                                }).catch(function (err) {
                                    console.log(err)
                                    return next(err);
                                });
        
        return personas || {};
    }

}

module.exports = PersonaService;