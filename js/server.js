const express = require("express");
const mqtt = require("mqtt");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const client = mqtt.connect("mqtt://localhost:1883");

let deviceState = {
  light: "OFF",
};

client.on("connect", () => {
  console.log("✅ MQTT connected");
  client.subscribe("smarthome/status/light");
});

client.on("message", (topic, message) => {
  if (topic === "smarthome/status/light") {
    deviceState.light = message.toString();
  }
});

app.post("/chat", (req, res) => {
  const msg = req.body.message.toLowerCase();

  if (msg.includes("trạng thái đèn")) {
    return res.json({
      reply: `💡 Đèn hiện đang ${deviceState.light}`,
    });
  }

  res.json({ reply: "🤖 Tôi chưa hiểu lệnh." });
});

app.listen(3000, () => console.log("🚀 AI Server running on port 3000"));
