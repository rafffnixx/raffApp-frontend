// Add event listener to the admin login form
document.getElementById("adminLoginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get user inputs
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Input validation: Check for empty fields
    if (!username || !password) {
        displayErrorMessage("Please enter both username and password.");
        return;
    }

    try {
        // Send login request to backend
        const response = await fetch("http://localhost:3000/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Decode token payload (assuming it's a JWT)
            const payload = JSON.parse(atob(data.token.split('.')[1]));

            // Check the user's role and store the token accordingly
            if (payload.role === "admin") {
                sessionStorage.setItem("adminToken", data.token); // Use sessionStorage for admin tokens
            } else {
                localStorage.setItem("customerToken", data.token); // Use localStorage for customer tokens
            }

            alert("Login successful!");
            window.location.href = "./admin-dashboard.html";
        } else {
            // Display error message from server
            displayErrorMessage(data.error || "Invalid username or password.");
        }
    } catch (err) {
        // Handle network or other errors
        console.error("Error during login:", err.message);
        displayErrorMessage("An error occurred. Please check your network and try again.");
    }
});

// Helper function to display error messages
function displayErrorMessage(message) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorMessage.style.color = "red"; // Add styling for emphasis
}
