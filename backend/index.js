const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")

const mainRouter = require("./routes/index");

const app = express();
const PORT = 3000;

app.use(cors());

app.use(bodyParser.json())
app.use("/api/v1", mainRouter);


app.listen(PORT, (e) => {
  if (e) console.log(e);
  console.log("Server is running on PORT", PORT);
})
