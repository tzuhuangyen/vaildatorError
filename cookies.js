const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/test", {
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to 吃到芒果了mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", (req, res) => {
  res.cookie("name,:Wilson");
});

app.get("/", (req, res) => {
  res.status(404).send("404 page not found");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("something is not working, we will fix it ASAP");
});

app.listen(3000, () => {
  console.log("server 開跑running port 3000");
});
