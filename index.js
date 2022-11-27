const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.e7zcqyn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const booksCollectionCategories = client
      .db("books")
      .collection("categories");
    const usersCollection = client.db("books").collection("users");

    app.post("/categories", async (req, res) => {
      const category = req.body;
      const result = await booksCollectionCategories.insertOne(category);
      res.send(result);
    });

    app.get("/categories", async (req, res) => {
      let query = {};
      if (req.query.category) {
        query = {
          category: req.query.category,
        };
      } else if (req.query.category) {
        query = {
          category: req.query.category,
        };
      }
      const cursor = booksCollectionCategories.find(query);
      const categories = await cursor.toArray();
      res.send(categories);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
