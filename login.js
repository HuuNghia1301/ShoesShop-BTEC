// Lấy các phần tử từ form
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Chuyển đổi giữa đăng ký và đăng nhập
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Đăng ký tài khoản
document.querySelector('.sign-up-container form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Lấy thông tin từ input
    const name = document.querySelector('.sign-up-container input[type="text"]').value;
    const email = document.querySelector('.sign-up-container input[type="email"]').value;
    const password = document.querySelector('.sign-up-container input[type="password"]').value;

    // Kiểm tra xem người dùng đã nhập đầy đủ thông tin chưa
    if (name === '' || email === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }

    // Lấy danh sách tài khoản từ localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Kiểm tra xem email đã tồn tại chưa
    const isEmailTaken = users.some(user => user.email === email);
    if (isEmailTaken) {
        alert('Email is already taken. Please use a different one.');
        return;
    }

    // Tạo đối tượng user mới
    const newUser = {
        name: name,
        email: email,
        password: password
    };

    // Thêm user vào danh sách và lưu lại vào localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Account created successfully! Please sign in.');
});

// Đăng nhập
document.querySelector('.sign-in-container form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Lấy thông tin từ input
    const email = document.querySelector('.sign-in-container input[type="email"]').value;
    const password = document.querySelector('.sign-in-container input[type="password"]').value;

    // Lấy danh sách tài khoản từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Tìm người dùng với email và password khớp
    const loggedInUser = users.find(user => user.email === email && user.password === password);

    // Kiểm tra thông tin đăng nhập
    if (loggedInUser) {
        alert('Login successful!');
        window.location.href = 'index.html';  
    } else {
        alert('Incorrect email or password!');
    }
});
