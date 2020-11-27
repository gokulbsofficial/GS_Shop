const viewImage = (event, image) => {
  if (image === "image1") {
    var prodimage = document.getElementById("prodimage1");
    prodimage.src = URL.createObjectURL(event.target.files[0]);
  } else if (image === "image2") {
    var prodimage = document.getElementById("prodimage2");
    prodimage.src = URL.createObjectURL(event.target.files[0]);
  } else {
    var prodimage = document.getElementById("prodimage3");
    prodimage.src = URL.createObjectURL(event.target.files[0]);
  }
};

function addToCart(proId) {
  $.ajax({
    url: "/add-to-cart/" + proId,
    method: "get",
    success: (response) => {
      if (response.status) {
        let count = $(".cart-count").html();
        count = parseInt(count) + 1;
        $(".cart-count").html(count);
        alert("Added to cart");
      } else {
        window.location = "/login";
      }
    },
  });
}
function changeQuantity(cartId, proId, userId, count) {
  let quantity = parseInt(document.getElementById(proId).innerHTML);
  count = parseInt(count);
  if (quantity === 1 && count === -1) {
    var con = confirm("Do Yo want delete this product");
    if (con) {
      $.ajax({
        url: "/remove-cart",
        data: {
          user: userId,
          cart: cartId,
          product: proId,
        },
        method: "post",
        success: (response) => {
          location.reload();
        },
      });
    }
  } else {
    $.ajax({
      url: "/change-product-quantity",
      data: {
        user: userId,
        cart: cartId,
        product: proId,
        count: count,
        quantity: quantity,
      },
      method: "post",
      success: (response) => {
        if (response.removeProduct) {
          alert("Product Removed from cart");
          location.reload();
        } else {
          document.getElementById(proId).innerHTML = quantity + count;
          document.getElementById("subTotal").innerHTML = "₹" + response.total;
          document.getElementById("total").innerHTML = "₹" + response.total;
        }
      },
    });
  }
}
function removeCart(cartId, proId, userId, name) {
  let check = confirm("Are you sure to remove " + name + " from cart ?");
  if (check == true) {
    $.ajax({
      url: "/remove-cart",
      data: {
        user: userId,
        cart: cartId,
        product: proId,
      },
      method: "post",
      success: (response) => {
        location.reload();
      },
    });
  }
}
$("#checkout-form").submit((e) => {
  e.preventDefault()
  $.ajax({
      url: '/place-order',
      method: 'post',
      data: $('#checkout-form').serialize(),
      success: (response) => {
          if (response.CODSuccess) {
              location.href = '/order-success'
          } else {
              razorpayPayment(response)
          }
      }
  })
})
function razorpayPayment(order) {
  var options = {
      "key": "rzp_test_WbBi7ofMaJMjnb", // Enter the Key ID generated from the Dashboard
      "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "GS Shopping Cart",
      "description": "Transfer Your Money Securly",
      "image": "/images/favicon.ico",
      "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response) {
          verifyPayment(response, order)
      },
      "prefill": {
          "name": "",
          "email": "",
          "contact": ""
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#8622DB"
      }
  };
  var rzp1 = new Razorpay(options);
  rzp1.on('payment.failed', function (response) {
      alert(
          response.error.reason +
          " on " +
          response.error.step +
          " Payment ID = " +
          response.error.metadata.payment_id +
          " Order ID = " +
          response.error.metadata.order_id
      );
      window.location = "/orders";
  });
  rzp1.open();
}
function verifyPayment(payment, order) {
  $.ajax({
      url: '/verify-payment',
      data: {
          payment,
          order
      },
      method: 'post',
      success: (response) => {
          if (response.status) {
              location.href = '/order-success'
          } else {
              alert("payment failed")
          }
      }
  })
}
