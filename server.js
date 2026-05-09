const express = require("express");

const app = express();

// Verizon sends JSON as text/plain
app.use(express.text({ type: "*/*" }));

app.post("/gps-webhook", (req, res) => {
  console.log("GPS DATA RECEIVED:");
  console.log(req.body);

  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Webhook is running");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
