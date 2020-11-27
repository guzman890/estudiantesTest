const  PostgresLib  = require('../lib/postgres')

class Detalle_cronogramaService{
    
    async getDetalle_cronogramasByIdCronograma({ id_cronograma }){
        const postgresLib =PostgresLib.getInstance();
        const detalle_cronogramas = await postgresLib.conection()
                        .any(`SELECT * FROM detalle_cronograma WHERE id_cronograma = ${id_cronograma}`)
                        .then(function (data) {
                            return data
                        }).catch(function (err) {
                            return next(err);
                        });
        return detalle_cronogramas || {};
    }

}

module.exports = Detalle_cronogramaService;