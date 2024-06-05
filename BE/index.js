const express = require("express");
const app = express();
const clientRouter = require("./routes/clients");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/", clientRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
