import React, { useState } from "react";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // 'success' or 'error'

    const handleSignup = async (event) => {
        event.preventDefault();
        setMessage("");
        setMessageType("");

        if (!username.trim()) {
            setMessage("Username is required");
            setMessageType("error");
            return;
        }

        if (!password.trim()) {
            setMessage("Password is required");
            setMessageType("error");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, role: "user" }),
            });

            const responseData = await response.text();
            if (response.ok) {
                setMessage("User registered successfully!");
                setMessageType("success");
            } else {
                setMessage(`Error: ${responseData}`);
                setMessageType("error");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            setMessage("An error occurred. Please try again.");
            setMessageType("error");
        }
    };

    return (
        <div>
            <header>
                <nav style={{ backgroundColor: "#333", padding: "1em" }}>
                    <a href="./home.html" style={linkStyle}>Home</a>
                    <a href="./services.html" style={linkStyle}>Services</a>
                    <a href="./login.html" style={linkStyle}>Login</a>
                </nav>
                <h1>Sign Up</h1>
            </header>
            <main>
                <form onSubmit={handleSignup} style={{ display: "inline-block", textAlign: "left" }}>
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
                    <button type="submit" style={buttonStyle}>Sign Up</button>
                </form>
                {message && (
                    <div
                        style={{
                            marginTop: "20px",
                            color: messageType === "success" ? "green" : "red",
                        }}
                    >
                        {message}
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
    margin: "0 15px",
    fontSize: "1.2em",
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

export default Signup;
