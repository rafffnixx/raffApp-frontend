import React, { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [messageClass, setMessageClass] = useState(""); // 'message' or 'message error'

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setLoginMessage("Logging in...");
        setMessageClass("message");

        try {
            // Send POST request to the backend for login
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Parse the response
                const result = await response.json();
                console.log("Login response:", result); // Debugging log

                // Save token and username to localStorage
                localStorage.setItem("token", result.token);
                localStorage.setItem("username", result.username);

                // Redirect to the home page
                setLoginMessage("Login successful! Redirecting...");
                setMessageClass("message");
                setTimeout(() => {
                    window.location.href = "/frontend/home.html"; // Replace with React navigation if necessary
                }, 1000);
            } else {
                // Handle login errors
                const errorData = await response.json();
                setLoginMessage(`Error: ${errorData.error || "Login failed. Please try again."}`);
                setMessageClass("message error");
            }
        } catch (error) {
            // Handle network or unexpected errors
            console.error("Error during login:", error);
            setLoginMessage("An error occurred. Please try again.");
            setMessageClass("message error");
        }
    };

    return (
        <div>
            <header>
                <nav style={{ backgroundColor: "#333", padding: "1em" }}>
                    <a href="./home.html" style={linkStyle}>Home</a>
                    <a href="./services.html" style={linkStyle}>Services</a>
                    <a href="user-request.html" style={linkStyle}>My Requests</a>
                    <button id="logoutButton" style={{ display: "none" }}>Logout</button>
                </nav>
                <h1>Login</h1>
            </header>
            <main>
                <form onSubmit={handleLogin} style={formStyle}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={inputStyle}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />

                    <button type="submit" style={buttonStyle}>Login</button>
                </form>
                {loginMessage && (
                    <div className={messageClass} style={{ marginTop: "20px", fontSize: "14px", color: messageClass.includes("error") ? "red" : "green" }}>
                        {loginMessage}
                    </div>
                )}
            </main>
        </div>
    );
};

// Inline styles
const linkStyle = {
    color: "white",
    textDecoration: "none",
    margin: "0 20px",
    fontSize: "1.2em",
};
const formStyle = {
    display: "inline-block",
    textAlign: "left",
};
const inputStyle = {
    marginBottom: "10px",
    padding: "8px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "5px",
};
const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

export default Login;
