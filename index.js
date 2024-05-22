var express = require("express");
var cors = require("cors");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

let multer = require("multer");

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});

let response = {};
app.post("/api/fileanalyse", multer().single("upfile"), (req, res) => {
  console.log(req.file);
  response["name"] = req.file.originalname;
  response["type"] = req.file.mimetype;
  response["size"] = req.file.size;
  res.json(response);
});
