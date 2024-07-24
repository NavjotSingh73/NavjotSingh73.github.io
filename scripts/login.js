// script.js

// Initialize Auth0 client
const auth0 = new auth0.WebAuth({
    domain: 'dev-pubklb6exjka1oj6.us.auth0.com',
    clientID: 'nKUKmT0q6QFnLz1K3dewT7izK31AKkVm',
    redirectUri: 'https://krakenxcharybdis.org/login', // Update with your redirect URI
    responseType: 'token id_token',
    scope: 'openid email profile'
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth0.client.login({
        realm: 'Username-Password-Authentication', // Update with your Auth0 connection name
        username: email,
        password: password
    }, function(err, authResult) {
        if (err) {
            console.error('Login failed:', err);
            alert('Login failed. Please check your credentials.');
        } else {
            console.log('Login successful:', authResult);
            // Save tokens or user profile data as needed (e.g., in localStorage)
            localStorage.setItem('accessToken', authResult.accessToken);
            localStorage.setItem('idToken', authResult.idToken);

            // Redirect or perform other actions after successful login
            window.location.href = '/dashboard.html'; // Example redirect to dashboard
        }
    });
});

// Show signup form
function showSignupForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

// Hide signup form
function hideSignupForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
}

// Signup form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    auth0.signup({
        connection: 'Username-Password-Authentication', // Update with your Auth0 connection name
        email: email,
        password: password
    }, function(err) {
        if (err) {
            console.error('Signup failed:', err);
            alert('Signup failed. Please try again.');
        } else {
            alert('Signup successful. Please login with your new account.');
            hideSignupForm(); // Hide signup form after successful signup
        }
    });
});
