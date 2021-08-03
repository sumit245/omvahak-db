const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const users = require("./api/users");
require('dotenv').config();
const mongoose=require('mongoose')
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.use(cors());
app.use("/api/users", users);
// app.use("/api/orders",orders)

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, "./build/")));
    app.get("/**", (req, res) => {
      res.sendFile(path.join(__dirname, "./build/"));
    });
  }
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});

