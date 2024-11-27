
let users = JSON.parse(localStorage.getItem('users')) || [];

// ---------------------Show Registration Form
function showRegistration() {
    document.getElementById('registration').classList.remove('hidden');
    document.getElementById('login').classList.add('hidden');
    document.getElementById('home').classList.add('hidden');
}

// ------------------Show Login Form
function showLogin() {
    document.getElementById('registration').classList.add('hidden');
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('home').classList.add('hidden');
}

//------------------- Show Home Page
function showHome(user) {
    document.getElementById('userName').textContent = `Welcome, ${user.name}!`;
    document.getElementById('registration').classList.add('hidden');
    document.getElementById('login').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
}

//---------------- Register a new user
function register() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const error = document.getElementById('regError');

    if (!name) {
        error.textContent = "Name is required.";
        return;
    }
    if (!validateEmail(email)) {
        error.textContent = "Invalid email format.";
        return;
    }
    if (users.some(user => user.email === email)) {
        error.textContent = "Email already registered. Try another.";
        return;
    }
    if (password.length < 6) {
        error.textContent = "Password must be at least 6 characters.";
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    error.textContent = "";
    alert("Registration successful! Redirecting to login.");
    showLogin();
}

// --------------------Login an existing user
function login() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const error = document.getElementById('loginError');

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        error.textContent = "Invalid email or password.";
        return;
    }

    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    error.textContent = "";
    showHome(user);
}

// ------------------Logout
function logout() {
    sessionStorage.removeItem('loggedInUser');
    showLogin();
}

//---------------- Validate Email Format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ---------------------------Check session on page load
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
        showHome(JSON.parse(loggedInUser));
    } else {
        showLogin();
    }
});
