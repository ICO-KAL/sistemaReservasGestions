const connectToDatabase = require('../config/dbConfig');

class user{
    constructor(){

    }
    
    // crud
    async getUser(req,res) {
        try{
           res.status(202).send('ver por id el primer usuario')
        }
        catch(e){
            console.log('error de este motivo: ',e)
        }
    }
    async getAll(req,res){
         try{
           res.status(202).send('ver todos los uruarios por id')
        }
        catch(e){
            console.log('error de todos los motivos: ',e);
        }
    }
    async create(req,res){
         try{
           res.status(202).send('crear el primer usuario')
        }
        catch(e){
            console.log('mostrar el primero error: ',e);
        }
    }
    async upDate(req,res){
         try{
           res.status(202).send('ver por id el primer usuario')
        }
        catch(e){
            console.log('error por esto',e)
        }
    }
    async detele(req,res){
         try{
           res.status(202).send('ver por id el primer usuario')
        }
        catch(e){
            console.log('error: ', e);
        }
    }
}