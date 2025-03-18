<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - raffApp</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 0px;
        }
        button {
            background-color: #252827;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #d32f2f;
        }
        nav {
            background-color: #333;
            padding: 1em;
        }
        nav a {
            color: white;
            text-decoration: none;
            margin: 0 20px;
            font-size: 1.2em;
        }
        nav a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <header>
        <nav>
            <button><a href="./home.html">Home</a></button>
            <button><a href="./services.html">Services</a></button>
            <button><a href="user-request.html">my requests</a></button>
            <button><a href="login.html">LOGIN</a></button>

            <button id="logoutButton" style="display:none;">Logout</button>

        </nav>
        <h1>Welcome to raffApp</h1>
    </header>
    <main>
        <p id="welcomeMessage"></p>
    </main>
    <script>
        const welcomeMessage = document.getElementById('welcomeMessage');
        const logoutButton = document.getElementById('logoutButton');

        // Simulate user authentication
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username'); // Fetch username from localStorage

        if (token && username) {
            // Display personalized welcome message and show logout button
            welcomeMessage.textContent = `Welcome, ${username}!`; // Use the username
            logoutButton.style.display = 'inline-block';
        } else {
            // Display generic welcome message
            welcomeMessage.textContent = 'Welcome to raffApp! Please log in for a personalized experience.';
        }

        logoutButton.addEventListener('click', () => {
            // Handle logout
            localStorage.removeItem('token');
            localStorage.removeItem('username'); // Remove username during logout
            window.location.href = './login.html';
        });

    </script>
</body>
</html>
