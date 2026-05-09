const express = require("express");
const https = require("https");

const app = express();

// IMPORTANT: SNS sends text/plain
app.use(express.text({ type: "*/*" }));

app.post("/gps-webhook", (req, res) => {
  const messageType = req.headers["x-amz-sns-message-type"];

  let body;
  try {
    body = JSON.parse(req.body);
  } catch (e) {
    console.log("Could not parse body:", req.body);
    return res.status(200).send("OK");
  }

  console.log("MESSAGE TYPE:", messageType);

  // STEP 1: Subscription confirmation
  if (messageType === "SubscriptionConfirmation") {
    console.log("Confirming subscription...");

    https.get(body.SubscribeURL, (response) => {
      console.log("Subscription confirmed:", response.statusCode);
    });

    return res.status(200).send("Subscription confirmed");
  }

  // STEP 2: GPS data
  if (messageType === "Notification") {
    console.log("GPS DATA RECEIVED:");
    console.log(body.data);
  }

  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Webhook is running");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
