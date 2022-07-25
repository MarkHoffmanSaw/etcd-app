const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config.env" });

const db = require("./db");
const dataRouter = require("./routes/dataRouter");

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api", dataRouter);

app.listen(PORT, () => {
  // Check the etcd connection:
  console.log(db && "Connected to ETCD successfully");
  console.log("Server is running on port:", PORT);
});
