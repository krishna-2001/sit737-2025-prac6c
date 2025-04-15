const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from version 2 of the Node.js app!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
