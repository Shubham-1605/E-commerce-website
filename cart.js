// remove item from cart
document.addEventListener("DOMContentLoaded", function () {
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const row = btn.closest("tr");
      if (row) {
        row.remove();
        updateCartTotal();
      }
    });
  });

  // Update subtotal and cart total when quantity changes
  const cartTable = document.querySelector("#cart tbody");
  if (cartTable) {
    cartTable.addEventListener("input", function (e) {
      if (e.target && e.target.type === "number") {
        const row = e.target.closest("tr");
        if (row) {
          const priceCell = row.querySelector("td:nth-child(4)");
          const subtotalCell = row.querySelector("td:nth-child(6)");
          let quantity = parseInt(e.target.value);
          if (quantity === 0) {
            row.remove();
            updateCartTotal();
            return;
          }
          if (!quantity || quantity < 0) quantity = 1;
          const price = parseFloat(priceCell.textContent.replace(/[^\d.]/g, ""));
          const subtotal = price * quantity;
          subtotalCell.textContent = `₹${subtotal.toFixed(2)}`;
          updateCartTotal();
        }
      }
    });
  }

  function updateCartTotal() {
    const rows = document.querySelectorAll("#cart tbody tr");
    let total = 0;
    rows.forEach(row => {
      const subtotalCell = row.querySelector("td:nth-child(6)");
      if (subtotalCell) {
        const subtotal = parseFloat(subtotalCell.textContent.replace(/[^\d.]/g, ""));
        total += subtotal;
      }
    });
    document.getElementById("cart-total").textContent = `₹${total.toFixed(2)}`;
    // Also update the Total in the summary table
    const summaryTotal = document.querySelector("#subtotal table tr:last-child td:last-child strong");
    if (summaryTotal) {
      summaryTotal.textContent = `₹${total.toFixed(2)}`;
    }
    // Redirect to home if cart is empty
    if (rows.length === 0) {
      // alert("Your cart is now empty. Redirecting to home page.");
      window.location.href = "index.html";
    }
  }
});


// payment
    document.getElementById("checkout-button").onclick = function (e) {
        e.preventDefault();

        // Get the current total from the cart total element
        var totalText = document.getElementById("cart-total").textContent;
        var totalAmount = parseFloat(totalText.replace(/[^\d.]/g, ""));
        if (isNaN(totalAmount) || totalAmount <= 0) {
            alert("Cart total is invalid or zero. Please check your cart.");
            return;
        }
        var options = {
            "key": "rzp_test_WIaR2NnkH6KGY2", 
            "amount": totalAmount * 100,
            "currency": "INR",
            "name": "Thunder Store",
            "description": "Thanks for shopping with us!",
            "image": "img/thunder.png",
            
            "handler": function (response) {
                alert("Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
                // You can redirect or store the payment ID
            },
            "prefill": {
                "name": "Customer Name",
                "email": "customer@example.com",
                "contact": "9999999999"
            },
            "notes": {
                "address": "Thunder Store, India"
            },
            "theme": {
                "color": "#0f3460"
            }
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();
    };

