const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🔸 Create Order
app.post("/create-order", async (req, res) => {
    const { amount } = req.body;

    try {
    const options = {
      amount: amount * 100, // amount in paise
    currency: "INR",
    receipt: "order_rcptid_11",
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({
    orderId: order.id,
    key: process.env.RAZORPAY_KEY_ID,
    amount: order.amount,
    });
    } catch (err) {
    res.status(500).send("Error creating order");
    }
});

// 🔸 Verify Payment Signature
app.post("/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    res.status(200).json({ message: "Payment verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid signature, payment failed" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
