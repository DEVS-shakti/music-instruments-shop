import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import AddInstrument from "./AddInstrument";
import { Helmet } from "react-helmet";
import { collection, getDocs, query, doc, deleteDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion"; // For animations
import { Dialog } from "@headlessui/react"; // For modal/dialogs
import {
  PlusCircle,
  Edit,
  Trash2,
  LogOut,
  Key,
  Info,
  X,
  Music,
  DollarSign,
  FileText,
  Image as ImageIcon, // Renamed to avoid conflict with 'Image' component if any
  CheckCircle, // For success messages
  AlertCircle, // For error messages
} from "lucide-react"; // Icons for better UI

function Dashboard() {
  const { user, logout, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [instruments, setInstruments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordResetDialogOpen, setIsPasswordResetDialogOpen] =
    useState(false);
  const [passwordResetStatus, setPasswordResetStatus] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for delete confirmation dialog
  const [itemToDeleteId, setItemToDeleteId] = useState(null); // State to hold ID of item to delete
  const [deleteStatus, setDeleteStatus] = useState(""); // Status for delete operation

  const isAuthor = user?.email === "reunkasahu785@gmail.com";

  useEffect(() => {
    const init = async () => {
      if (!user) {
        navigate("/login");
      } else if (isAuthor) {
        await fetchInstruments();
      }
      setLoading(false);
    };
    init();
  }, [user, isAuthor, navigate]); // Added navigate to dependency array

  const fetchInstruments = async () => {
    try {
      const storeRef = collection(db, "store");
      const q = query(storeRef);
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInstruments(items);
    } catch (err) {
      console.error("Error fetching instruments:", err);
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  // Modified handleDelete to open confirmation dialog
  const handleDelete = (id) => {
    setItemToDeleteId(id);
    setIsDeleteDialogOpen(true);
    setDeleteStatus(""); // Clear any previous delete status
  };

  // New function to confirm and execute deletion
  const confirmDelete = async () => {
    setIsDeleteDialogOpen(false); // Close dialog immediately
    if (itemToDeleteId) {
      try {
        await deleteDoc(doc(db, "store", itemToDeleteId));
        setDeleteStatus("Instrument deleted successfully! ✅");
        fetchInstruments(); // Refresh the list
      } catch (error) {
        console.error("Error deleting instrument:", error);
        setDeleteStatus("Failed to delete instrument. Please try again. ❌");
      } finally {
        setItemToDeleteId(null);
      }
    }
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setItemToDeleteId(null);
    setDeleteStatus("");
  };

  const handleUpdate = () => {
    setEditId(null); // Clear editId after update
    fetchInstruments();
  };

  const handleCancelEdit = () => {
    setEditId(null); // Cancel edit mode
  };

  const handleChangePassword = async () => {
    if (user?.email) {
      try {
        // Corrected to use resetPassword from AuthContext, which sends an email
        await resetPassword(user.email); // This is the correct function to use
        setPasswordResetStatus(
          "Password reset link sent to your email. Please check your inbox."
        );
      } catch (err) {
        console.error("Failed to send password reset email:", err);
        setPasswordResetStatus(
          "Failed to send password reset email. Please try again later."
        );
      } finally {
        setIsPasswordResetDialogOpen(true);
      }
    }
  };

  // Enhanced logout function with navigation and error handling
  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logout successful. Navigating to /login.");
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      // You might want a small toast or message here for logout errors
      // Using alert for now, consider a custom dialog for better UX
      alert("Failed to log out. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    );

  return (
    <motion.div
      className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Dashboard | New Nirmal Musicals</title>
        <meta
          name="description"
          content="Access your instrument dashboard, manage listings, and get support."
        />
        <meta property="og:title" content="Dashboard | New Nirmal Musicals" />
        <meta
          property="og:description"
          content="Manage instruments, update prices, and access admin tools."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta
          property="og:url"
          content="https://newnirmalmusicals.com/dashboard"
        />
      </Helmet>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-gray-900">Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleChangePassword}
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Key size={20} /> Reset Password
          </button>
          <button
            onClick={handleLogout} // Changed to handleLogout
            className="px-6 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {isAuthor ? (
        <div>
          <AddInstrument
            editId={editId}
            onUpdated={handleUpdate}
            onCancelEdit={handleCancelEdit}
          />

          <h2 className="text-3xl font-bold mb-6 text-gray-800 mt-10">
            Your Instruments
          </h2>
          {instruments.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-inner">
              <Music size={80} className="text-gray-400 mb-4" />
              <p className="text-xl font-semibold text-gray-700">
                No instruments added yet.
              </p>
              <p className="text-gray-500 mt-2 text-center">
                Start by adding your first instrument above!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {instruments.map((item) => (
                  <motion.div
                    key={item.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    {item.image && (
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/400x300/E0E7FF/3F51B5?text=No+Image";
                          }}
                        />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-lg font-semibold text-green-600 mb-3">
                        ₹{item.price}
                      </p>
                      <p className="text-sm text-gray-700 flex-grow mb-4">
                        {item.desc}
                      </p>
                      <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-1"
                        >
                          <Edit size={18} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-1"
                        >
                          <Trash2 size={18} /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
          {deleteStatus && ( // Display delete status after dialog closes
            <p
              className={`text-center mt-6 text-lg font-medium ${
                deleteStatus.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {deleteStatus}
            </p>
          )}
        </div>
      ) : (
        <motion.div
          className="text-center mt-20 p-8 bg-blue-50 rounded-xl shadow-md border border-blue-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Welcome, {user?.email}!
          </h2>
          <p className="text-lg text-blue-700">
            You are logged in, but this dashboard section is reserved for
            authorized users (e.g., store administrators). Please enjoy browsing
            our catalogue!
          </p>
          <button
            onClick={() => navigate("/catalogue")}
            className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Go to Catalogue
          </button>
        </motion.div>
      )}

      {/* Password Reset Status Dialog */}
      <Dialog
        open={isPasswordResetDialogOpen}
        onClose={() => setIsPasswordResetDialogOpen(false)}
        className="relative z-[9999]"
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-sm w-full rounded-xl bg-white p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Info size={24} className="text-blue-500" />
                Password Reset
              </Dialog.Title>
              <button
                onClick={() => setIsPasswordResetDialogOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              >
                <X size={20} />
              </button>
            </div>
            <p className="mb-6 text-gray-700 text-center">
              {passwordResetStatus}
            </p>
            <button
              onClick={() => setIsPasswordResetDialogOpen(false)}
              className="mt-3 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={cancelDelete}
        className="relative z-[9999]"
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-sm w-full rounded-xl bg-white p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Trash2 size={24} className="text-red-500" />
                Confirm Deletion
              </Dialog.Title>
              <button
                onClick={cancelDelete}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              >
                <X size={20} />
              </button>
            </div>
            <p className="mb-6 text-gray-700 text-center">
              Are you sure you want to delete this instrument? This action
              cannot be undone.
            </p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-1"
              >
                <Trash2 size={18} /> Delete
              </button>
              <button
                onClick={cancelDelete}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </motion.div>
  );
}

export default Dashboard;
