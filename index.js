const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
// middleware
require("dotenv").config();
app.use(cors());
app.use(express.json());

async function run() {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h9wahhk.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // user collection
    const mobilicis_user_Collection = client
      .db("mobilicis_user")
      .collection("user");

    //   get all user
    app.get("/user", async (req, res) => {
      const query = {};
      const result = await mobilicis_user_Collection.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.error());

app.get("/", (req, res) => {
  res.send("mobilicis server is running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
