
    document.getElementById('checkout-button').onclick = function(e) {
        e.preventDefault();

        var options = {
            "key": "rzp_test_WIaR2NnkH6KGY2",
            "amount": 1000000, // Amount in paise (₹10000.00)
            "currency": "INR",
            "name": "Cara Store",
            "description": "Test Transaction",
            "image": "img/logo1.png",
            "handler": function (response){
                alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
                // You can redirect to a thank-you page here
            },
            "prefill": {
                "name": "Customer Name",
                "email": "customer@example.com",
                "contact": "9999999999"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

