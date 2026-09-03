import dbClient from '../config/dbConfig.js';

export default class user {
    constructor(id,nombre,contraseña,email){
        this.id = id;
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.email = email;
    }
    
    create(user){
        const read = dbClient.db.collection('practicaMongo');
        const create = read.insertOne(user);
    }
}