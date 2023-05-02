const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://ndnaveensweeebe:TxVLOXk33gjStUra@cluster0.4kqguuo.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    return client;
  } catch (err) {
    console.log('Error connecting to MongoDB Atlas: ', err);
    process.exit(1);
  }
}

module.exports = connect;

  
