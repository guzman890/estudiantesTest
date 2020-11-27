const  PostgresLib  = require('../lib/postgres')

class GradoService{
    
    async getGrados(){
        const postgresLib =PostgresLib.getInstance();
        //const grados = {"id":1,"grado": "SEG"}
        const grados = await postgresLib.conection()
                        .any('SELECT * FROM grado')
                        .then(function (data) {
                            return data
                        }).catch(function (err) {
                            return next(err);
                        });
        //console.log(grados)
        return grados || {};
    }

    async getGradosById( { nid_grado } ){
        const postgresLib =PostgresLib.getInstance();
        //const grados = {"id":1,"grado": "SEG"}
        const grados = await postgresLib.conection()
                        .any(`SELECT * FROM grado WHERE nid_grado = ${nid_grado}`)
                        .then(function (data) {
                            return data
                        }).catch(function (err) {
                            return next(err);
                        });
        //console.log(grados)
        return grados || {};
    }
}

module.exports = GradoService;
