import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    // Simulate user authentication
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username"); // Fetch username from localStorage

    const navigate = useNavigate();

    const handleLogout = () => {
        // Handle logout
        localStorage.removeItem("token");
        localStorage.removeItem("username"); // Remove username during logout
        navigate("/login"); // Navigate to the login page
    };

    return (
        <div>
            <header>
                <nav style={{ backgroundColor: "#333", padding: "1em" }}>
                    <button>
                        <Link to="/" style={linkStyle}>Home</Link>
                    </button>
                    <button>
                        <Link to="/services" style={linkStyle}>Services</Link>
                    </button>
                    <button>
                        <Link to="/user-request" style={linkStyle}>My Requests</Link>
                    </button>
                    <button>
                        <Link to="/login" style={linkStyle}>Login</Link>
                    </button>

                    <button
                        id="logoutButton"
                        onClick={handleLogout}
                        style={{ display: token ? "inline-block" : "none" }}
                    >
                        Logout
                    </button>
                </nav>
                <h1>Welcome to raffApp</h1>
            </header>
            <main>
                <p id="welcomeMessage">
                    {token && username
                        ? `Welcome, ${username}!` // Personalized message
                        : "Welcome to raffApp! Please log in for a personalized experience."}
                </p>
            </main>
        </div>
    );
};

// Styling for links inside the buttons
const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "1.2em",
};

export default Home;
