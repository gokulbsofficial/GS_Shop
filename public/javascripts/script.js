function addToCart(proId) {
    $.ajax({
        url: '/add-to-cart/' + proId,
        method: 'get',
        success: (response) => {
            if (response.status) {
                let count = $('.cart-count').html()
                count = parseInt(count) + 1
                $('.cart-count').html(count)
            }
            alert("Added to cart")
        }
    })
}
function changeQuantity(cartId, proId, userId, count) {
    let quantity = parseInt(document.getElementById(proId).innerHTML)
    count = parseInt(count)
    $.ajax({
        url: '/change-product-quantity',
        data: {
            user: userId,
            cart: cartId,
            product: proId,
            count: count,
            quantity: quantity
        },
        method: 'post',
        success: (response) => {
            if (response.removeProduct) {
                alert("Product Removed from cart")
                location.reload()
            } else {
                document.getElementById(proId).innerHTML = quantity + count
                document.getElementById('subTotal').innerHTML = "₹" + response.total
                document.getElementById('total').innerHTML = "₹" + response.total
            }
        }
    })
}
function removeCart(cartId, proId, userId, name) {
    let check = confirm("Are you sure to remove " + name + " from cart ?")
    if (check == true) {
        $.ajax({
            url: '/remove-cart',
            data: {
                user: userId,
                cart: cartId,
                product: proId,
            },
            method: 'post',
            success: (response) => {
                location.reload()
            }
        })
    }
}