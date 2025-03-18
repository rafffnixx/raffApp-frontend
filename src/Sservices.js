import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Services = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch services from the backend
        const fetchServices = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/services");
                if (!response.ok) {
                    throw new Error(`Failed to fetch services: ${response.statusText}`);
                }
                const services = await response.json();

                // Group services by category
                const groupedServices = services.reduce((groups, service) => {
                    if (!groups[service.category]) {
                        groups[service.category] = [];
                    }
                    groups[service.category].push(service);
                    return groups;
                }, {});
                setServices(groupedServices);
            } catch (error) {
                console.error("Error fetching services:", error);
                setError("Failed to load services. Please try again later.");
            }
        };

        fetchServices();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        navigate("/login"); // Use React Router for navigation
    };

    const handleRequest = async (serviceId, serviceName, quantity) => {
        const username = localStorage.getItem("username");

        // Ensure user is logged in
        if (!username) {
            alert("You must be logged in to make a request.");
            return;
        }

        // Ensure quantity is valid
        if (!quantity || quantity < 1) {
            alert("Please enter a valid quantity.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, product_name: serviceName, quantity }),
            });

            if (response.ok) {
                alert("Request submitted successfully!");
            } else {
                const errorData = await response.json();
                alert(`Failed to submit request: ${errorData.error || "Please try again."}`);
            }
        } catch (error) {
            console.error("Error submitting request:", error);
            alert("An error occurred while submitting the request.");
        }
    };

    return (
        <div>
            <header>
                <nav style={{ backgroundColor: "#333", padding: "1em" }}>
                    <Link to="/" style={linkStyle}>Home</Link>
                    <Link to="/services" style={linkStyle}>Services</Link>
                    <Link to="/user-request" style={linkStyle}>My Requests</Link>
                    <button id="logout" onClick={handleLogout} style={buttonStyle}>Logout</button>
                </nav>
                <h1>Available Services</h1>
            </header>
            <main>
                {error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    Object.keys(services).map((category) => (
                        <div key={category} style={{ marginBottom: "30px" }}>
                            <h2>{category}</h2>
                            <div style={servicesContainerStyle}>
                                {services[category].map((service) => (
                                    <div key={service.id} style={serviceStyle}>
                                        <img
                                            src={service.imageurl || "/path/to/default-image.jpg"}
                                            alt={service.name}
                                            style={{ maxWidth: "100%", borderRadius: "5px" }}
                                        />
                                        <h3>{service.name}</h3>
                                        <p><strong>Category:</strong> {service.category}</p>
                                        <p><strong>Price:</strong> ${service.price}</p>
                                        <p><strong>Description:</strong> {service.description}</p>
                                        <label htmlFor={`quantity-${service.id}`}>Quantity:</label>
                                        <input
                                            type="number"
                                            id={`quantity-${service.id}`}
                                            min="1"
                                            defaultValue="1"
                                            style={{ width: "60px" }}
                                            onChange={(e) =>
                                                handleRequest(service.id, service.name, parseInt(e.target.value, 10))
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
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
const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};
const servicesContainerStyle = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
};
const serviceStyle = {
    border: "1px solid #ccc",
    padding: "15px",
    margin: "10px",
    borderRadius: "10px",
    textAlign: "left",
    width: "250px",
};

export default Services;
