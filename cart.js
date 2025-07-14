document.getElementById("checkout-button").onclick = function (e) {
  e.preventDefault();

  var options = {
    key: "rzp_test_WIaR2NnkH6KGY2",
    amount: 1000000, // Amount in paise (₹10000.00)
    currency: "INR",
    name: "Cara Store",
    description: "Test Transaction",
    image: "img/logo1.png",
    handler: function (response) {
      window.location.href = "thankyou.html";
    },
    prefill: {
      name: "Customer Name",
      email: "customer@example.com",
      contact: "9999999999",
    },
    theme: {
      color: "#3399cc",
    },
  };

  var rzp1 = new Razorpay(options);
  rzp1.open();
};

document.getElementById("checkout-btn").addEventListener("click", async () => {
  const amount = 10000; // ₹100.00

  const res = await fetch("http://localhost:5000/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: amount }),
  });

  const data = await res.json();

  const options = {
    key: data.key,
    amount: data.amount,
    currency: "INR",
    name: "Cara Store",
    description: "Test Order",
    order_id: data.orderId,
    handler: async function (response) {
      const verify = await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });

      const verifyRes = await verify.json();
      alert(verifyRes.message);
    },
    theme: { color: "#3399cc" },
  };

  const rzp = new Razorpay(options);
  rzp.open();
});
