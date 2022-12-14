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
    const adsCollection = client.db("books").collection("ads");
    const bookingsCollection = client.db("books").collection("bookings");

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
      }
      const cursor = booksCollectionCategories.find(query);
      const categories = await cursor.toArray();
      res.send(categories);
    });

    app.get("/categories/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const category = await booksCollectionCategories.findOne(query);
      res.send(category);
    });

    app.delete("/categories/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await booksCollectionCategories.deleteOne(query);
      res.send(result);
    });
    app.get("/users", async (req, res) => {
      let query = {};
      if (req.query.role) {
        query = {
          role: req.query.role,
        };
      }
      const cursor = usersCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/ads", async (req, res) => {
      const ad = req.body;
      const result = await adsCollection.insertOne(ad);
      res.send(result);
    });

    app.get("/ads", async (req, res) => {
      let query = {};
      if (req.query.ad) {
        query = {
          ad: req.query.ad,
        };
      }
      const cursor = booksCollectionCategories.find(query);
      const ads = await cursor.toArray();
      res.send(ads);
    });

    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const result = await bookingsCollection.insertOne(booking);
      res.send(result);
    });
    app.get("/bookings", async (req, res) => {
      let query = {};
      if (req.query.booking) {
        query = {
          booking: req.query.bookings,
        };
      }
      const cursor = bookingsCollection.find(query);
      const bookings = await cursor.toArray();
      res.send(bookings);
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
