import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components for each page
import Home from "./frontend/Home";
import Services from "./frontend/Services";
import Signup from "./frontend/Signup";
import UserRequest from "./frontend/UserRequest";
import Login from "./frontend/Login";

function App() {
    return (
        <Router>
            <Routes>
                {/* Routes for your pages */}
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/user-request" element={<UserRequest />} />
                <Route path="/login" element={<Login />} />

                {/* Redirect any undefined routes to the home page */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
