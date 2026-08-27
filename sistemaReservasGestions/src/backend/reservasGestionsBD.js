const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const url = 'la inportacion de la base de datos va aca';

async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to database');
        return client.db();
    } catch (error) {
        console.error('Error connecting to database', error);
        throw error;
    }
}
export default connectToDatabase;
