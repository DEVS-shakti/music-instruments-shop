import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Dialog } from "@headlessui/react"; // Import Dialog from Headless UI
import shop1 from "../assets/shop1.png"; // Ensure these images exist
import shop2 from "../assets/shop2.png";
import { Helmet } from "react-helmet";
import qrCode from "../assets/WhatsApp.png"; // Ensure this QR image exists

// Import Lucide React icons for a cleaner UI
import {
  Phone,
  MessageSquare,
  MapPin,
  Mail,
  User,
  Send,
  X,
  Info,
} from "lucide-react";

const Contact = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false); // State for the QR dialog

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending message..."); // Provide immediate feedback

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: new Date(),
        uid: user?.uid || null,
      });
      setStatus("Message sent successfully! 🎉 We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error); // Log the actual error
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen">
      <Helmet>
        <title>Contact | New Nirmal Musicals</title>
        <meta
          name="description"
          content="Get in touch with New Nirmal Musicals for any queries or support regarding musical instruments."
        />
        <meta property="og:title" content="Contact | New Nirmal Musicals" />
        <meta
          property="og:description"
          content="Reach out to us for help, support, or business inquiries."
        />
        <meta
          property="og:url"
          content="https://newnirmalmusicals.com/contact"
        />
        <meta property="og:image" content="/og-image.jpg" />
      </Helmet>

      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
        Get in Touch With Us
      </h1>

      {/* About Section */}
      <section className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-12 border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          About Nirmal Musicals & Sons
        </h2>
        <p className="text-gray-700 text-center text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
          We are a legacy musical instrument shop, proudly offering a wide range
          of classical and modern instruments. Based in India, our passion is to
          make music accessible and affordable to all aspiring and seasoned
          musicians. With decades of experience, we ensure quality and
          authenticity in every instrument.
        </p>

        {/* Shop Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <img
            src={shop1}
            alt="Shop Interior 1"
            className="rounded-xl shadow-lg w-full h-auto object-cover transform transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x400/E0E7FF/3F51B5?text=Shop+Image+1";
            }}
          />
          <img
            src={shop2}
            alt="Shop Interior 2"
            className="rounded-xl shadow-lg w-full h-auto object-cover transform transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x400/E0E7FF/3F51B5?text=Shop+Image+2";
            }}
          />
        </div>

        {/* Contact Information */}
        <div className="text-center space-y-4">
          <p className="text-xl text-gray-800 font-semibold flex items-center justify-center gap-2">
            <Phone size={20} className="text-blue-500" />
            Phone:{" "}
            <a
              href="tel:+918102467065"
              className="text-blue-600 hover:underline"
            >
              +91 8102467065
            </a>
          </p>
          <p className="text-xl text-gray-800 font-semibold flex items-center justify-center gap-2">
            <Mail size={20} className="text-red-500" />
            Email:{" "}
            <a
              href="mailto:info@nirmalmusicals.com"
              className="text-blue-600 hover:underline"
            >
              info@nirmalmusicals.com
            </a>
          </p>
          <p className="text-xl text-gray-800 font-semibold flex items-center justify-center gap-2">
            <MapPin size={20} className="text-purple-500" />
            Address: 123 Music Lane, Harmony City, India
          </p>
          <button
            onClick={() => setIsQRDialogOpen(true)}
            className="mt-6 px-8 py-3 bg-green-600 text-white rounded-full font-semibold text-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2"
          >
            <MessageSquare size={20} /> Contact on WhatsApp
          </button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Send Us a Message
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div className="relative">
            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-y"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Send size={20} /> Send Message
          </button>
          {status && (
            <p
              className={`text-center mt-4 text-lg font-medium ${
                status.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {status}
            </p>
          )}
        </form>
      </section>

      {/* QR Code Dialog (Headless UI Dialog) */}
      <Dialog
        open={isQRDialogOpen}
        onClose={() => setIsQRDialogOpen(false)}
        className="relative z-[9999]" // High z-index to ensure it's on top
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-sm w-full rounded-xl bg-white p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Info size={24} className="text-green-500" />
                WhatsApp Contact
              </Dialog.Title>
              <button
                onClick={() => setIsQRDialogOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mb-4 text-gray-700 text-center">
              Scan the QR code below to chat with us directly on WhatsApp!
            </p>

            <div className="flex justify-center mb-6">
              <img
                src={qrCode}
                alt="WhatsApp QR Code"
                className="h-56 w-56 object-contain border border-gray-200 rounded-lg p-2 shadow-sm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/224x224/E0E7FF/3F51B5?text=QR+Code";
                }}
              />
            </div>

            <div className="text-center text-sm space-y-2">
              <p className="font-semibold text-gray-800 flex items-center justify-center gap-2">
                <Phone size={16} className="text-blue-500" />
                Or call us at: +91 8102467065
              </p>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <MessageSquare size={16} className="text-green-500" />
                Click the button below to open WhatsApp chat.
              </p>
            </div>

            <a
              href="https://wa.me/918102467065"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsQRDialogOpen(false)}
              className="mt-6 block w-full text-center bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Open WhatsApp Chat
            </a>

            <button
              onClick={() => setIsQRDialogOpen(false)}
              className="mt-3 w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Contact;
