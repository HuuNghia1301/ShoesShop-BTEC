// Thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra nếu sản phẩm đã có trong giỏ hàng (cùng tên, màu sắc và kích thước)
    let existingProduct = cart.find(item => item.name === product.name && item.color === product.color && item.size === product.size);

    if (existingProduct) {
        existingProduct.quantity += 1; // Tăng số lượng nếu sản phẩm đã có
    } else {
        product.quantity = 1; // Nếu chưa có, số lượng là 1
        cart.push(product);
    }

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Cập nhật giỏ hàng
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('cart-total-price');
    
    // Xóa nội dung giỏ hàng hiện tại trong DOM
    cartItemsContainer.innerHTML = '';
    
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
        totalPriceElement.textContent = `$0.00`;
        return;
    }

    // Hiển thị các sản phẩm trong giỏ hàng
    cart.forEach(item => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="product-info">
                <p><strong>${item.name}</strong></p>
                <p>Size: ${item.size}</p>
                <p>Color: ${item.color}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: 
                    <button onclick="changeQuantity('${item.name}', '${item.color}', '${item.size}', -1)">-</button> 
                    ${item.quantity} 
                    <button onclick="changeQuantity('${item.name}', '${item.color}', '${item.size}', 1)">+</button>
                </p>
            </div>
        `;
        cartItemsContainer.appendChild(productElement);
        
        totalPrice += item.price * item.quantity; // Cập nhật tổng giá trị giỏ hàng
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Thay đổi số lượng sản phẩm trong giỏ hàng
function changeQuantity(name, color, size, delta) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.name === name && item.color === color && item.size === size);

    if (product) {
        product.quantity += delta;  // Thay đổi số lượng sản phẩm

        if (product.quantity <= 0) {
            cart = cart.filter(item => item !== product); // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ hàng
        }
    }

    // Lưu giỏ hàng vào localStorage và cập nhật giao diện
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Mở/đóng giỏ hàng
function toggleCart() {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.classList.toggle('show');
    updateCart();
}

// Chọn màu sắc cho sản phẩm
function selectColor(color) {
    const colorOptions = document.getElementsByClassName('color-option');
    for (let i = 0; i < colorOptions.length; i++) {
        colorOptions[i].style.border = 'none'; 
    }

    const selectedColorElement = Array.from(colorOptions).find(element => element.style.backgroundColor === color);
    if (selectedColorElement) {
        selectedColorElement.style.border = '2px solid black';  
    }
}

function changeProductColor(name, size, newColor) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.name === name && item.size === size);

    if (product) {
        product.color = newColor;  // Cập nhật màu sắc
    }

    // Lưu giỏ hàng vào localStorage và cập nhật giao diện
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Cập nhật giá trị kích thước khi thay đổi
function updateSizeValue() {
    const sizeValue = document.getElementById('size-range').value;
    document.getElementById('size-value').textContent = sizeValue;
}

// Xử lý sự kiện "Buy Now"
document.querySelectorAll('.buy-now').forEach((button) => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productImage = productCard.querySelector('img').src;
        const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));
        const productSize = productCard.querySelector('#size-value').textContent || 'defaultSize';
        const selectedColorElement = productCard.querySelector('.color-option[style*="border: 2px solid black"]');
        const productColor = selectedColorElement ? selectedColorElement.style.backgroundColor : 'defaultColor'; 

        const product = {
            name: productName,
            image: productImage,
            price: productPrice,
            size: productSize,
            color: productColor
        };

        addToCart(product); // Lưu sản phẩm vào localStorage
    });
});

// Hàm hiển thị sản phẩm trong giỏ hàng
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('cart-total-price');

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <tr>
                <td colspan="7">Your cart is empty!</td>
            </tr>
        `;
        totalPriceElement.textContent = `Total Price: $0.00`;
        return;
    }

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.classList.add('cart-item');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" /></td>
            <td>${item.name}</td>
            <td>${item.size}</td>
            <td>${item.color}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <div class="quantity-controls">
                    <button onclick="changeQuantity('${item.name}', '${item.color}', '${item.size}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.name}', '${item.color}', '${item.size}', 1)">+</button>
                </div>
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(row);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

// changeQuantity - Thay đổi số lượng
function changeQuantity(name, color, size, delta) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.name === name && item.color === color && item.size === size);

    if (product) {
        product.quantity += delta;
        if (product.quantity <= 0) {
            cart = cart.filter(item => item !== product);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// checkout - Thanh toán
function checkout() {
    if (confirm('Are you sure you want to checkout?')) {
        alert('Thank you for your purchase!');
        localStorage.removeItem('cart');
        displayCart();
    }
}

// Hàm gọi khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    displayCart();
});


