const express = require("express");
const router = require("./router");
const path = require("path")
const PORT = 8080;
const app = express();
let cors = require("cors");
// applying handler for API
// app.use(cors({
//   origin: 'http://localhost:3000'
// }));
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// Handling serving static files
app.use(function (req, res, next) {
  express.static(path.join(__dirname, '../client/build'));
  next();
}); 
app.use("/", router);
// Serving app on PORT we defined
app.listen(PORT, () => {
  console.log(`Express is running on port ${PORT}`);
});