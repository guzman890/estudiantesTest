const  PostgresLib  = require('../lib/postgres')

class NivelService{
    
    async getNiveles(){
        const postgresLib =PostgresLib.getInstance();
        //const niveles = {"id":1,"nivel": "SEG"}
        const niveles = await postgresLib.conection()
                        .any('SELECT * FROM nivel')
                        .then(function (data) {
                            return data
                        }).catch(function (err) {
                            return next(err);
                        });
        //console.log(niveles)
        return niveles || {};
    }

    async getNivelBYyId( { nid_nivel } ){
        const postgresLib =PostgresLib.getInstance();
        //const niveles = {"id":1,"nivel": "SEG"}
        const niveles = await postgresLib.conection()
                        .any(`SELECT * FROM nivel WHERE nid_nivel = '${nid_nivel}' `)
                        .then(function (data) {
                            return data
                        }).catch(function (err) {
                            return next(err);
                        });
        //console.log(niveles)
        return niveles || {};
    }
}

module.exports = NivelService;