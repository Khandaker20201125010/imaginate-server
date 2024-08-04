const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 5000;
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.texsw4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    const userCollection = client.db("imaginate").collection("users");


    app.get('/users', async (req, res) => {
       
          const users = await userCollection.find().toArray();
          res.send(users);
      
      });
    app.post('/users',async (req,res) =>{
      const userinfo = req.body
      const query = { email: userinfo?.email }
      const existingUser = await userCollection.findOne(query)
      if (existingUser) {
          return
      }
      const result = await userCollection.insertOne(userinfo)
      res.send(result)

    })
    


















    

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hostel is processing');
});


app.listen(port, () => {
  console.log(`Hostel is running on ${port}`);
});