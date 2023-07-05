require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

console.log(process.env.dbURL);
//mongodb connection
mongoose
  .connect(process.env.dbURL)
  .then(console.log(`DB Connected`))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());

//Routes
app.use("/user", require("./server/routes/user"));
app.use("/post", require("./server/routes/post"));
app.use("/follow", require("./server/routes/follow"));
app.use("/api", require("./server/routes/api"));
app.use("/upload", require("./server/routes/upload"));
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public", "index.html"))
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-Width,Content-Type,Accept,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
