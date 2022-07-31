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
    console.log("connected to 吃芒果了mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

// 範例 如果使用async await function 處理錯誤必須使用try .catch 才會顯示status500
const monkeySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
  },
});

const Monkey = mongoose.model("Monkey", monkeySchema);

// app.get("/", (req, res) => {
//   //   try {
//   let newMonkey = new Monkey({ name: "Benson M" });
//   newMonkey
//     .save()
//     .then(() => {
//       res.send("data has been save");
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// });

//validator error has to be caught by ,catch
// app.get("/", async (req, res, next) => {
//   try {
//     let newMonkey = new Monkey({ name: "CJ" });
//     newMonkey
//       .save()
//       .then(() => {
//         res.send("data has been save");
//       })
//       .catch((err) => {
//         res.send("err");
//       });
//   } catch (e) {
//     next(e);
//   }
// });

//another example findOneAndUpdata validator error has to be caught by ,catch

app.get("/", async (req, res, next) => {
  try {
    await Monkey.findOneAndUpdate(
      { name: "Benson M" },
      { name: "Benson Kelly" },
      { new: true, runValidators: true },
      (err, doc) => {
        if (err) {
          res.send(err);
        } else {
          res.send(doc);
        }
      }
    );
  } catch (e) {
    next(e);
  }
});

app.get("/", async (req, res, next) => {
  try {
    let foundData = await Monkey.findOne({ name: "Benson M" });
    res.send(foundData);
  } catch (e) {
    next(e);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("something is not working, we will fix it ASAP");
});

app.listen(3000, () => {
  console.log("server 開跑running port 3000");
});
