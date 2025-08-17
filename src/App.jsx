import { Routes, Route } from "react-router-dom"; // Removed Router
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoutes";
import AddInstrument from "./pages/AddInstrument";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import { useState } from "react";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-instrument"
          element={
            <ProtectedRoute>
              <AddInstrument />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-instrument"
          element={
            <ProtectedRoute>
              <AddInstrument />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-instrument/:id"
          element={
            <ProtectedRoute>
              <AddInstrument />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
