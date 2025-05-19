const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

const { MongoClient, ServerApiVersion} = require('mongodb');
// midleware

app.use(cors());
app.use(express.json());


// mongodb




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aymctjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {


    // datbase collections
const datbase = client.db("BillCraft");
const productsCollection = datbase.collection('products')


  app.get('/api/products', async (req, res) => {
    const products = await productsCollection.find().toArray();
    res.json(products);
  });


// serch products

app.get('/api/products/search', async (req, res) => {
  const searchQuery = req.query.name;


  try {
    const query = searchQuery
      ? { name: { $regex: searchQuery, $options: 'i' } } 
      : {};

    const results = await productsCollection.find(query).toArray();
    console.log('Search results count:', results.length);
    res.json(results);
  } catch (error) {
    console.error('Error searching products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// add products
app.post('/api/add-products', async (req, res) => {
  const product = req.body;


  try {
    const result = await productsCollection.insertOne(product);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});





    console.log("E-Rashid successfully connected to MongoDB!");
  } finally {
    
   
  }
}
run().catch(console.dir);

// 


app.get( '/' ,(req,res)=>{
    res.send('E-Rashid running');
})

app.listen(port,()=>{
    console.log(`E-Rashid is running on:${port}`);
})