import React, { useState, useEffect } from "react";

const UserRequests = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const username = localStorage.getItem("username");

        if (!username) {
            alert("You must be logged in to view your requests.");
            window.location.href = "./login.html"; // Replace with React navigation if necessary
            return;
        }

        const fetchUserRequests = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/requests/${username}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user requests");
                }
                const requestsData = await response.json();
                setRequests(requestsData);
            } catch (error) {
                console.error("Error fetching user requests:", error);
                setError("Failed to load your requests.");
            }
        };

        fetchUserRequests();
    }, []);

    return (
        <div>
            <header>
                <nav style={{ backgroundColor: "#333", padding: "1em" }}>
                    <a href="./home.html" style={linkStyle}>Home</a>
                    <a href="./services.html" style={linkStyle}>Services</a>
                    <a href="./user-request.html" style={linkStyle}>My Requests</a>
                </nav>
                <h1>My Requests</h1>
            </header>
            <main>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Product Name</th>
                            <th style={thStyle}>Quantity</th>
                            <th style={thStyle}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error ? (
                            <tr>
                                <td colSpan="4" style={{ color: "red" }}>{error}</td>
                            </tr>
                        ) : requests.length === 0 ? (
                            <tr>
                                <td colSpan="4">Loading your requests...</td>
                            </tr>
                        ) : (
                            requests.map((request) => (
                                <tr key={request.id}>
                                    <td>{request.id}</td>
                                    <td>{request.product_name}</td>
                                    <td>{request.quantity}</td>
                                    <td>{request.status}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

// Inline Styles
const linkStyle = {
    color: "white",
    textDecoration: "none",
    margin: "0 15px",
    fontSize: "1.2em",
};
const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
};
const thStyle = {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    textAlign: "center",
    border: "1px solid black",
};

export default UserRequests;
