import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import AddInstrument from "./AddInstrument";
import { Helmet } from "react-helmet";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";
import {
  Edit,
  Trash2,
  LogOut,
  Key,
  Music,
  Sparkles,
  PlusCircle,
  Mail,
  ShieldCheck,
  BadgeAlert,
} from "lucide-react";

function Dashboard() {
  const { user, logout, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [instruments, setInstruments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInstrumentDialogOpen, setInstrumentDialogOpen] = useState(false);
  const [instrumentDialogMode, setInstrumentDialogMode] = useState("add");
  const [selectedInstrumentId, setSelectedInstrumentId] = useState(null);
  const [isPasswordResetDialogOpen, setIsPasswordResetDialogOpen] = useState(false);
  const [passwordResetStatus, setPasswordResetStatus] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState("");
  const [isMessageDeleteDialogOpen, setIsMessageDeleteDialogOpen] = useState(false);
  const [messageToDeleteId, setMessageToDeleteId] = useState(null);
  const [messageDeleteStatus, setMessageDeleteStatus] = useState("");

  const ADMIN_EMAIL = "reunkasahu785@gmail.com";
  const isAuthor = user?.email === ADMIN_EMAIL;
  const userRoleLabel = isAuthor ? "Admin" : "User";
  const userRoleClasses = isAuthor
    ? "bg-green-100 text-green-800"
    : "bg-blue-100 text-blue-800";

  const deriveNameFromEmail = (email) => {
    if (!email) return "Guest";
    const raw = email.split("@")[0];
    return raw
      .split(/[._-]/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  const displayName = deriveNameFromEmail(user?.email);

  const fetchInstruments = useCallback(async () => {
    try {
      const storeRef = collection(db, "store");
      const q = query(storeRef);
      const snapshot = await getDocs(q);
      setInstruments(
        snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }))
      );
    } catch (err) {
      console.error("Error fetching instruments:", err);
    }
  }, []);

  const fetchMessages = useCallback(async () => {
    try {
      const contactsRef = collection(db, "contact");
      const q = query(contactsRef, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      setMessages(
        snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }))
      );
    } catch (err) {
      console.error("Error fetching contact messages:", err);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      if (!user) {
        navigate("/login");
        return;
      }
      if (isAuthor) {
        await fetchInstruments();
        await fetchMessages();
      }
      setLoading(false);
    };
    init();
  }, [user, isAuthor, navigate, fetchInstruments, fetchMessages]);

  const formatTimestamp = (value) => {
    if (!value) return "Date unavailable";
    let resolved = value;
    if (resolved?.toDate) resolved = resolved.toDate();
    else if (resolved?.toMillis) resolved = new Date(resolved.toMillis());
    else resolved = new Date(resolved);
    if (!(resolved instanceof Date) || Number.isNaN(resolved.getTime())) {
      return "Date unavailable";
    }
    return resolved.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const openInstrumentDialog = (mode, id = null) => {
    setInstrumentDialogMode(mode);
    setSelectedInstrumentId(id);
    setInstrumentDialogOpen(true);
  };

  const closeInstrumentDialog = () => {
    setInstrumentDialogOpen(false);
    setInstrumentDialogMode("add");
    setSelectedInstrumentId(null);
  };

  const handleAddNewInstrument = () => {
    if (!isAuthor) return;
    openInstrumentDialog("add");
  };

  const handleEdit = (id) => openInstrumentDialog("edit", id);

  const handleDelete = (id) => {
    setItemToDeleteId(id);
    setIsDeleteDialogOpen(true);
    setDeleteStatus("");
  };

  const handleDeleteMessage = (id) => {
    setMessageToDeleteId(id);
    setIsMessageDeleteDialogOpen(true);
    setMessageDeleteStatus("");
  };

  const confirmDelete = async () => {
    setIsDeleteDialogOpen(false);
    if (!itemToDeleteId) return;
    try {
      await deleteDoc(doc(db, "store", itemToDeleteId));
      setDeleteStatus("Instrument deleted successfully!");
      fetchInstruments();
    } catch (err) {
      console.error("Error deleting instrument:", err);
      setDeleteStatus("Delete failed. Please try again.");
    } finally {
      setItemToDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteStatus("");
    setItemToDeleteId(null);
    setIsDeleteDialogOpen(false);
  };

  const confirmDeleteMessage = async () => {
    setIsMessageDeleteDialogOpen(false);
    if (!messageToDeleteId) return;
    try {
      await deleteDoc(doc(db, "contacts", messageToDeleteId));
      setMessageDeleteStatus("Message deleted successfully!");
      fetchMessages();
    } catch (err) {
      console.error("Error deleting message:", err);
      setMessageDeleteStatus("Delete failed. Please try again.");
    } finally {
      setMessageToDeleteId(null);
    }
  };

  const cancelDeleteMessage = () => {
    setMessageDeleteStatus("");
    setMessageToDeleteId(null);
    setIsMessageDeleteDialogOpen(false);
  };

  const handlePasswordReset = async () => {
    if (user?.email) {
      try {
        await resetPassword(user.email);
        setPasswordResetStatus("Password reset email sent successfully.");
      } catch (err) {
        console.error(err);
        setPasswordResetStatus("Failed to send password reset email.");
      } finally {
        setIsPasswordResetDialogOpen(true);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="px-4 py-10 min-h-screen bg-slate-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Dashboard | New Nirmal Musicals</title>
      </Helmet>

      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Dashboard Workspace
            </p>
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${userRoleClasses}`}
            >
              {userRoleLabel}
            </span>
            <button
              onClick={handlePasswordReset}
              className="rounded-full border border-blue-600 px-4 py-1 text-sm font-semibold text-blue-600"
            >
              <Key size={14} /> Reset password
            </button>
            <button
              onClick={handleLogout}
              className="rounded-full bg-red-600 px-4 py-1 text-sm font-semibold text-white"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 font-bold text-xl">
                  {displayName.charAt(0)}
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Profile</p>
                  <h2 className="text-2xl font-bold text-gray-900">{displayName}</h2>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${userRoleClasses}`}>
                {userRoleLabel}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Mail size={16} className="text-blue-500" />
              {user?.email || "Email unavailable"}
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              {isAuthor ? (
                <>
                  <ShieldCheck size={18} className="text-green-600" />
                  <span>Admin privileges: manage catalogue and review messages.</span>
                </>
              ) : (
                <>
                  <BadgeAlert size={18} className="text-amber-500" />
                  <span>Standard user: view-only access, no edit powers.</span>
                </>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 shadow-inner space-y-3">
            <div className="flex items-center gap-2 text-blue-900">
              <Sparkles size={18} />
              <p className="font-semibold">What you can do</p>
            </div>
            {isAuthor ? (
              <ul className="text-sm text-blue-900/80 space-y-2">
                <li>• Add, edit, or delete instruments in the live catalogue.</li>
                <li>• View all contact messages submitted via the site.</li>
                <li>• Keep the storefront up to date for visitors.</li>
              </ul>
            ) : (
              <ul className="text-sm text-blue-900/80 space-y-2">
                <li>• Browse the latest instruments in the catalogue.</li>
                <li>• Use the Contact page to reach the developer directly.</li>
                <li>• Dashboard access is read-only for your account.</li>
              </ul>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/catalogue")}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow"
              >
                View Catalogue
              </button>
              {!isAuthor && (
                <button
                  onClick={() => navigate("/contact")}
                  className="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 bg-white"
                >
                  Contact Developer
                </button>
              )}
            </div>
          </div>
        </section>

        {isAuthor ? (
          <div className="space-y-10">
            <section className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Your Instruments</h2>
                <p className="text-sm text-gray-500">All items currently published.</p>
              </div>
              {instruments.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-gray-300 bg-white/60 p-8 text-center shadow-inner">
                  <Music size={60} className="mx-auto text-gray-400" />
                  <p className="mt-3 text-lg font-semibold text-gray-700">
                    No instruments yet.
                  </p>
                  <p className="text-sm text-gray-500">
                    Tap the floating button to launch the form.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {instruments.map((item) => (
                      <motion.article
                        key={item.id}
                        className="rounded-3xl border border-gray-100 bg-white shadow-xl overflow-hidden"
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        {item.image && (
                          <div className="h-48 overflow-hidden bg-slate-100">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-5 space-y-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
                              Instrument
                            </p>
                            <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600 min-h-[44px]">{item.desc}</p>
                          <div className="flex items-center justify-between text-green-600 font-semibold">
                            <span className="text-lg">₹{item.price}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(item.id)}
                                className="flex items-center gap-1 rounded-full border border-blue-600 px-3 py-1 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                              >
                                <Edit size={16} /> Edit
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="flex items-center gap-1 rounded-full border border-red-500 px-3 py-1 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                              >
                                <Trash2 size={16} /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Visitor Messages</h2>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                    {messages.length} message{messages.length === 1 ? "" : "s"}
                  </p>
                </div>
                <span className="text-xs text-gray-500">Ordered by newest</span>
              </div>
              {messages.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-slate-50 p-6 text-center text-gray-500">
                  No contact form submissions yet.
                </div>
              ) : (
                <div className="mt-6 grid gap-4">
                  {messages.map((message) => (
                    <article
                      key={message.id}
                      className="rounded-2xl border border-gray-100 bg-slate-50 p-4 shadow"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {message.name || "Anonymous"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {message.email || "Email not provided"}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(message.timestamp)}
                          </span>
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className="inline-flex items-center gap-1 rounded-full border border-red-500 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-700 whitespace-pre-wrap break-words">
                        {message.message}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>
            {deleteStatus && (
              <p
                className={`text-center font-semibold ${
                  deleteStatus.includes("success") ? "text-green-600" : "text-red-600"
                }`}
              >
                {deleteStatus}
              </p>
            )}
            {messageDeleteStatus && (
              <p
                className={`text-center font-semibold ${
                  messageDeleteStatus.includes("success") ? "text-green-600" : "text-red-600"
                }`}
              >
                {messageDeleteStatus}
              </p>
            )}
          </div>
        ) : (
          <motion.section
            className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-gray-900">Viewing only</h2>
            <p className="text-gray-600 text-sm">
              Your account is tagged as a user. You can browse instruments publicly from the catalogue.
              Admin-only controls to edit/delete items are hidden for you.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/catalogue")}
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white"
              >
                Go to Catalogue
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700"
              >
                Contact Developer
              </button>
            </div>
          </motion.section>
        )}
      </div>

      {isAuthor && (
        <>
          <Dialog
            open={isInstrumentDialogOpen}
            onClose={closeInstrumentDialog}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
                <AddInstrument
                  editId={instrumentDialogMode === "edit" ? selectedInstrumentId : null}
                  onUpdated={fetchInstruments}
                  onClose={closeInstrumentDialog}
                  onCancelEdit={closeInstrumentDialog}
                />
              </Dialog.Panel>
            </div>
          </Dialog>

          <button
            onClick={handleAddNewInstrument}
            className="fixed bottom-8 right-8 flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl"
          >
            <PlusCircle size={18} /> Add instrument
          </button>
        </>
      )}

      <Dialog
        open={isPasswordResetDialogOpen}
        onClose={() => setIsPasswordResetDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <Dialog.Title className="text-xl font-bold text-gray-900">
              Password Reset
            </Dialog.Title>
            <p className="mt-4 text-sm text-gray-600">{passwordResetStatus}</p>
            <button
              onClick={() => setIsPasswordResetDialogOpen(false)}
              className="mt-6 w-full rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      {isAuthor && (
        <Dialog
          open={isDeleteDialogOpen}
          onClose={cancelDelete}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
              <Dialog.Title className="text-xl font-bold text-gray-900">
                Confirm Deletion
              </Dialog.Title>
              <p className="mt-4 text-sm text-gray-600">
                Are you sure you want to delete this instrument? This cannot be undone.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={confirmDelete}
                  className="flex-1 rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Delete
                </button>
                <button
                  onClick={cancelDelete}
                  className="flex-1 rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}

      {isAuthor && (
        <Dialog
          open={isMessageDeleteDialogOpen}
          onClose={cancelDeleteMessage}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
              <Dialog.Title className="text-xl font-bold text-gray-900">
                Delete message?
              </Dialog.Title>
              <p className="mt-4 text-sm text-gray-600">
                This will remove the visitor message permanently from Firestore.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={confirmDeleteMessage}
                  className="flex-1 rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Delete
                </button>
                <button
                  onClick={cancelDeleteMessage}
                  className="flex-1 rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </motion.div>
  );
}

export default Dashboard;
