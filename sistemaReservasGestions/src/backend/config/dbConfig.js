import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import path from 'path';

// Carga las variables desde src/reservas.env usando una ruta absoluta
dotenv.config({ path: path.resolve(import.meta.dirname, '../../reservas.env') });

const url = `mongodb+srv://${process.env.userBD}:${process.env.passwoard}@${process.env.clientBD}/?appName=practicas`;
const client = new MongoClient(url);

async function connectToDatabase() {
    try {
        await client.connect();
        const db = client.db('practicaMongo');
        console.log('Connected to database successfully');
        return db;
    } catch (e) {
        console.error('Error connecting to database', e); 
    } finally {
        await client.close();
    }
}
connectToDatabase();

export default connectToDatabase;
