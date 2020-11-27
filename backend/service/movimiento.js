const  PostgresLib  = require('../lib/postgres')

class MovimientoService{
    
    async getMovimientosByIdPersona({ nid_persona }){
        const postgresLib =PostgresLib.getInstance();
        //const movimientos = {"id":1,"movimiento": "SEG"}
        const movimientos = await postgresLib.conection()
                        .any(`SELECT * FROM movimiento WHERE id_persona = ${nid_persona} ORDER BY id_detalle_cronograma ASC `)
                        .then(function (data) {
                            return data
                        }).catch(function (err) {
                            return next(err);
                        });
        //console.log(movimientos)
        return movimientos || {};
    }

    async getMovimientosById({id_movimiento}){
        const postgresLib =PostgresLib.getInstance();
        //const movimientos = {"id":1,"movimiento": "SEG"}
        const movimientos = await postgresLib.conection()
                        .any(`SELECT * FROM movimiento WHERE id_movimiento = ${id_movimiento}`)
                        .then(function (data) {
                            return data
                        }).catch(function (err) {
                            return next(err);
                        });
        //console.log(movimientos)
        return movimientos || {};
    }

    async createMovimiento({ movimientos }){
        const postgresLib =PostgresLib.getInstance();
        movimientos.map(async movimiento=>{
            const getmovimiento = await postgresLib.conection()
                                .query(`INSERT INTO movimiento (
                                            tipo_movimiento, 
                                            monto, 
                                            estado, 
                                            fecha_pago, 
                                            id_persona, 
                                            id_detalle_cronograma
                                        ) VALUES ( 
                                            '${movimiento.tipo_movimiento}', 
                                            ${movimiento.monto}, 
                                            ${movimiento.estado}, 
                                            '${movimiento.fecha_pago}', 
                                            ${movimiento.id_persona}, 
                                            ${movimiento.id_detalle_cronograma}
                                        ) RETURNING id_movimiento `)
                                .then(function (data) {
                                    return data
                                }).catch(function (err) {
                                    console.log(err)
                                    return next(err);
                                });
            movimiento.id_movimiento = getmovimiento
        })
        
        return movimientos || {};
    }

    async updateMovimientoById({ movimientos }){
        const postgresLib =PostgresLib.getInstance();
        movimientos.map(async movimiento=>{
            const getmovimiento = await postgresLib.conection()
                                .query(`UPDATE movimiento SET 
                                            tipo_movimiento = '${movimiento.tipo_movimiento}',
                                            monto = ${movimiento.monto}, 
                                            estado = ${movimiento.estado}, 
                                            fecha_pago = '${movimiento.fecha_pago}', 
                                            id_persona = ${movimiento.id_persona}, 
                                            id_detalle_cronograma = ${movimiento.id_detalle_cronograma}
                                        WHERE
                                            id_movimiento = '${movimiento.id_movimiento}'
                                        RETURNING id_movimiento `)
                                .then(function (data) {
                                    return data
                                }).catch(function (err) {
                                    console.log(err)
                                    return next(err);
                                });
            movimiento.id_movimiento = getmovimiento
        })
        return movimientos || {};
    }

}

module.exports = MovimientoService;