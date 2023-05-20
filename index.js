const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const path = require('path');

const { PORT } = require("./utilities/config");
const { connectToDatabase } = require("./utilities/db");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("KerjaAja API is running 🥳");
})

app.use('/static', express.static(path.join(__dirname, 'assets')));

const main = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}

main();
