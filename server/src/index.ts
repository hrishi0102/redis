import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));

async function startServer() {
  try {
    await client.connect();
    console.log("Redis Connected");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.error("Failed to connect to Redis", error);
  }
}

app.post("/submit", async (req, res) => {
  const { userId, name, email } = req.body;

  try {
    await client.LPUSH("user", JSON.stringify({ userId, name, email }));
    res.status(200).send("User receieved and stored");
  } catch (error) {
    console.error("Redis error:", error);
    res.status(500).send("Failed to store User.");
  }
});

startServer();
