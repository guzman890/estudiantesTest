const pgp = require('pg-promise')({
    /* initialization options */
    capSQL: true // capitalize all generated SQL
});


const { config } = require("../config/index")

const USER = config.DB_USER;
const PASSWORD = config.DB_PASSWORD;
const DB_NAME = config.DB_NAME;
const DB_HOST = config.DB_HOST

const cn = `postgres://${USER}:${PASSWORD}@${DB_HOST}:5432/${DB_NAME}`;

class PrivateSingleton {
    constructor() {
        console.log(cn)
        this.client = pgp(cn)
    }

    conection(){
        return this.client;
    }
}

class PostgresLib {
    constructor(){
        this.message = 'I am an instance';
    }

    static getInstance() {
        if (!PostgresLib.instance) {
            PostgresLib.instance = new PrivateSingleton();
        }
        return PostgresLib.instance;
    }
}

module.exports = PostgresLib;