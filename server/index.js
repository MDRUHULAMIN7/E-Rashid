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