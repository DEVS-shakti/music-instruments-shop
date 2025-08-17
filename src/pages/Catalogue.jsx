import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { Dialog } from "@headlessui/react";
import { Helmet } from "react-helmet";
import QR from "../assets/WhatsApp.png"; // Ensure this image exists
import {
  X,
  Music,
  ShoppingBag,
  Info,
  Phone,
  MessageSquare,
} from "lucide-react"; // Importing some icons for better UI

const NoInstrumentsSVG = () => (
  <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-inner">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-400 mb-4"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
    <p className="text-xl font-semibold text-gray-700">
      Oops! No Instruments Available
    </p>
    <p className="text-gray-500 mt-2 text-center">
      Check back later, we're working on adding new items to our catalogue.
    </p>
  </div>
);

function Catalogue() {
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const q = query(collection(db, "store"));
        const querySnapshot = await getDocs(q);
        const list = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInstruments(list);
      } catch (err) {
        console.error("Error fetching instruments:", err);
      }
      setLoading(false);
    };

    fetchInstruments();
  }, []);

  const openDialog = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedItem(null);
    setIsDialogOpen(false);
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
          <span className="text-gray-600">Loading catalogue...</span>
        </div>
      </div>
    );
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen">
      <Helmet>
        <title>Catalogue | New Nirmal Musicals</title>
        <meta
          name="description"
          content="Browse our complete catalogue of musical instruments including tablas, guitars, harmoniums, and more."
        />
        <meta property="og:title" content="Catalogue | New Nirmal Musicals" />
        <meta
          property="og:description"
          content="Discover traditional and modern musical instruments."
        />
        <meta
          property="og:url"
          content="https://newnirmalmusicals.com/catalogue"
        />
        <meta property="og:image" content="/og-image.jpg" />
      </Helmet>

      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        Our Catalogue
      </h1>

      {instruments.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <NoInstrumentsSVG />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {instruments.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-xl shadow-lg p-5 bg-white flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="w-full h-48 sm:h-56 overflow-hidden rounded-lg mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm mt-2 flex-grow mb-4">
                {item.desc}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <p className="text-xl font-bold text-green-600">
                  ₹{item.price}
                </p>
                <button
                  onClick={() => openDialog(item)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <ShoppingBag className="w-4 h-4 inline mr-2" /> Buy It
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
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
                Contact Seller
              </Dialog.Title>
              <button
                onClick={closeDialog}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mb-4 text-gray-700">
              Interested in{" "}
              <span className="font-bold text-blue-600">
                {selectedItem?.name}
              </span>
              ? Get in touch with us to purchase this item.
            </p>

            <div className="flex flex-col items-center justify-center space-y-4 my-6">
              <img
                src={QR}
                alt="WhatsApp QR Code"
                className="h-48 w-48 object-contain border border-gray-200 rounded-lg p-2 shadow-sm"
              />
              <div className="text-center">
                <p className="font-semibold text-gray-800 flex items-center justify-center gap-2">
                  <Phone size={16} className="text-green-500" />
                  +91 8102467065
                </p>
                <p className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-2">
                  <MessageSquare size={16} className="text-green-500" />
                  Scan the QR code or click the button below to WhatsApp us.
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/918102467065?text=Hello,%20I'm%20interested%20in%20the%20${selectedItem?.name}%20I%20saw%20on%20your%20website.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeDialog}
              className="mt-4 block w-full text-center bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Contact on WhatsApp
            </a>

            <button
              onClick={closeDialog}
              className="mt-3 w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default Catalogue;
