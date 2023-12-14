const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Adicione o middleware cors
app.use(cors());

let client; // Declare a variável client fora do bloco try

// Endpoint para suas operações no MongoDB
app.post('/api/files', async (req, res) => {
  try {
    // Conectar ao MongoDB
    const client = new MongoClient('mongodb://10.0.0.106:27017') //, { useNewUrlParser: true, useUnifiedTopology: true });
 

    // Exemplo de consulta ao banco de dados
    const db = client.db('url-saver');
    await client.connect()

    console.log(req.body)
    //const result = await db.collection('files').find({}).toArray();

    const result = await db.collection("files").insertOne(req.body)

    // Enviar os resultados como resposta
    res.json(result);
  } catch (error) {
    console.error('Erro ao consultar o MongoDB:', error);
    res.status(500).json({ error: 'Erro ao consultar o MongoDB' });
  } finally {
    // Certifique-se de fechar a conexão após o uso
    await client.close();
  }
});


app.get('/api/files', async (req, res) => {
  try {
    // Conectar ao MongoDB
    client = new MongoClient('mongodb://10.0.0.106:27017');
    await client.connect();

    // Listar todos os bancos de dados
    const adminDb = client.db('admin');
    const databaseList = await adminDb.admin().listDatabases();

    console.log('Bancos de dados disponíveis:');
    databaseList.databases.forEach((db) => {
      console.log(`- ${db.name}`);
    });

    // Listar todas as coleções no banco de dados padrão
    const defaultDb = client.db();
    const collectionList = await defaultDb.listCollections().toArray();

    console.log('\nColeções no banco de dados padrão:');
    collectionList.forEach((collection) => {
      console.log(`- ${collection.name}`);
    });

    // Consultar o banco de dados para obter todos os documentos
    const db = client.db('url-saver');
    const collection = db.collection('files');

    // Listar todos os documentos na coleção
    const documentList = await collection.find({}).toArray();
    console.log('\nDocumentos na coleção:');
    documentList.forEach((document) => {
      console.log(document);
    });

    // Enviar os resultados como resposta
    res.json(documentList);
  } catch (error) {
    console.error('Erro ao consultar o MongoDB:', error);
    res.status(500).json({ error: 'Erro ao consultar o MongoDB' });
  } finally {
    // Certifique-se de fechar a conexão após o uso
    if (client) {
      await client.close();
    }
  }
});



const PORT = 3001; // Porta para o servidor intermediário
app.listen(PORT, () => {
  console.log(`Servidor intermediário está rodando na porta ${PORT}`);
});

