import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components for each page
import Home from "./Home";
import Sservices from "./Sservices";
import Signup from "./Signup";
import UserRequest from "./UserRequests";
import Login from "./Login";



function App() {
    return (
        <Router>
            <Routes>
                {/* Routes for your pages */}
                <Route path="/" element={<Home />} />
                <Route path="/sservices" element={<Sservices />} />
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
