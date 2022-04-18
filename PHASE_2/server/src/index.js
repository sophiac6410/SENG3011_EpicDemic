const express = require("express");
const router = require("./router");
const path = require("path")
const PORT = 8080;
const app = express();
let cors = require("cors");
// applying handler for API
app.use("/", router);
app.use(cors({
  origin: 'http://localhost:3000'
}));
// Handling serving static files
app.use(express.static(path.join(__dirname, '../client/build')));
// Serving app on PORT we defined
app.listen(PORT, () => {
  console.log(`Express is running on port ${PORT}`);
});