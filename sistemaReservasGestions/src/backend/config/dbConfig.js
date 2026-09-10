import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

export default new class conection{
    constructor(){
      this.reservasConection();
    }
    async reservasConection(){
       try{
          dotenv.config({ path: path.resolve(import.meta.dirname, '../../reservas.env') });
          this.url = `mongodb+srv://${process.env.userBD}:${process.env.passwoard}@${process.env.clientBD}/?appName=practicas`;
          this.conection = await mongoose.Connection(this.url);   
          console.log('base de datos conectadda'); 
       } catch(e){
          console.log(e);
       }
    }
    async reservasExit(){
        try{
           this.disconnect = await mongoose.disconnect();
           console.log('base de datos desconectada');
           return this.disconnect;
        }
        catch(e){
            console.log(e);
        }
    }
}

