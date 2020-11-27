const  PostgresLib  = require('../lib/postgres')

class CronogramaService{
    
    async getCronogramas(){
        const postgresLib = PostgresLib.getInstance();
        //const cronogramas = {"id":1,"cronograma": "SEG"}
        const cronogramas = await postgresLib.conection()
                        .any('SELECT * FROM cronograma')
                        .then(function (data) {
                            return data
                        }).catch(function (err) {
                            return next(err);
                        });
        //console.log(cronogramas)
        return cronogramas || {};
    }

    async getCronogramaById( { id_cronograma } ){
        const postgresLib =PostgresLib.getInstance();
        const cronogramas = await postgresLib.conection()
                        .any(`SELECT * FROM cronograma WHERE id_cronograma = ${id_cronograma}`)
                        .then(function (data) {
                            return data
                        }).catch(function (err) {
                            return next(err);
                        });
        //console.log(grados)
        return cronogramas || {};
    }

    
}

module.exports = CronogramaService;