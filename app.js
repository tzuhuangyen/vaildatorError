const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.set("views engine", "ejs");

mongoose
  .connect("mongodb://127.0.0.1/monkeys", {
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
//1先簡單定義一個schema
const monkeySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
  },
});
//2把定義schema註冊到monggose.model
const Monkey = mongoose.model("Monkey", monkeySchema);

//3.建立新猴子
// app.get("/", (req, res) => {
//   //   try {
//   let newMonkey = new Monkey({ name: "Test K." });
//   newMonkey
//     .save()
//     .then(() => {
//       res.send("data has been save");
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// });

//4.錯誤範例  使用findone 找到剛剛新增的monkey 錯誤範例 不會顯示status 500
// app.get("/", async (req, res) => {
//   let foundData = await Monkey.findOned({ name: "Test K." });
//   res.send(foundData);
// });

//5.確範例 使用findone 找到剛剛新增的monkey 正確範例
//使用async (req, res, next) ＋ try { catch (e) {next(e);才能出現 顯示status 500

// app.get("/", async (req, res, next) => {
//   try {
//     let foundData = await Monkey.findOne({ name: "Test K." });
//     res.send(foundData);
//   } catch (e) {
//     //catch到錯誤後才會放入next(e)
//     next(e);
//     //然後才會接下來傳送到status(500)的err
//   }
// });

//validator error has to be caught by ,catch
// 測試結果沒有出現錯誤細節 等待老師回復
// app.get("/", async (req, res, next) => {
//   try {
//     let newMonkey = new Monkey({ name: "CJ" });
//     newMonkey
//       .save()
//       .then(() => {
//         res.send("new data has been save");
//       })
//       .catch((err) => {
//         //內層的catch抓validator錯誤
//         res.send("err");
//       });
//   } catch (e) {
//     //外層catch抓monkey得連結錯誤
//     next(e);
//   }
// });

//another example findOneAndUpdata validator error has to be caught by ,catch

app.get("/", async (req, res, next) => {
  try {
    await Monkey.findOneAndUpdate(
      { name: "Test K." },
      { name: "Test K. CJ" },
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

app.get("/*", (req, res) => {
  res.status(404).send("404 page not found lol");
});

//error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("something is not working, we will fix it ASAP");
});

app.listen(3000, () => {
  console.log("server 開跑running port 3000");
});
