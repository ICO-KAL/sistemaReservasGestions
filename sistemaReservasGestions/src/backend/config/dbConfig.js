import dotenv from 'dotenv';
//import 'dotenv/config';
import mongoose from 'mongoose';
import path from 'path';
import process from 'node:process';

export default new class conection{
    constructor(){
      this.reservasConection();
    }
    async reservasConection(){
       try{
          dotenv.config({ path: path.resolve(import.meta.dirname, '../../.env') });
          this.url = `mongodb+srv://${process.env.userBD}:${process.env.passwoard}@${process.env.clientBD}/?appName=practicas`;
          this.conection = await mongoose.connect(this.url);   
          console.log('base de datos conectadda'); 
       } catch(e){
          console.log(e);
       }
    }
    async reservasExit(){
        try{
           return await mongoose.disconnect(),'base de datos desconectada';
        }
        catch(e){
            console.log(e);
        }
    }
}

