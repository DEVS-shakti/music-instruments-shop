import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { motion } from 'framer-motion';
import {
  PlusCircle,
  Music,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Send
} from 'lucide-react';

// Component for adding/editing an instrument
const AddInstrument = ({ editId, onUpdated, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    desc: '',
    image: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInstrumentForEdit = async () => {
      if (editId) {
        setLoading(true);
        try {
          const docRef = doc(db, 'store', editId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setFormData(docSnap.data());
          } else {
            setStatus("Instrument not found.");
          }
        } catch (error) {
          console.error("Error fetching instrument for edit:", error);
          setStatus("Failed to load instrument for editing.");
        } finally {
          setLoading(false);
        }
      } else {
        // Reset form data when not in edit mode
        setFormData({ name: '', price: '', desc: '', image: '' });
        setStatus(''); // Clear status when switching from edit to add
      }
    };
    fetchInstrumentForEdit();
  }, [editId]); // Re-run when editId changes

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(""); // Clear previous status

    if (!formData.name || !formData.price || !formData.desc || !formData.image) {
      setStatus("Please fill all fields.");
      setLoading(false);
      return;
    }

    try {
      if (editId) {
        // Update existing document
        const docRef = doc(db, 'store', editId);
        await updateDoc(docRef, formData);
        setStatus("Instrument updated successfully! 🎉");
      } else {
        // Add new document
        await addDoc(collection(db, 'store'), formData);
        setStatus("Instrument added successfully! 🎉");
      }
      setFormData({ name: '', price: '', desc: '', image: '' }); // Clear form after successful submission
      onUpdated(); // Trigger refresh in parent component
      if (editId) onCancelEdit(); // Close edit mode after update
    } catch (error) {
      console.error("Error saving instrument:", error);
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100"
    >
      <h3 className="text-2xl font-bold mb-5 text-gray-800 flex items-center gap-2">
        <PlusCircle size={24} className="text-blue-500" />
        {editId ? 'Edit Instrument' : 'Add New Instrument'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Music className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            name="name"
            placeholder="Instrument Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            disabled={loading}
          />
        </div>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            name="price"
            type="number"
            placeholder="Price (e.g., 15000)"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            disabled={loading}
          />
        </div>
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
          <textarea
            name="desc"
            placeholder="Description"
            rows="4"
            value={formData.desc}
            onChange={handleChange}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-y"
            disabled={loading}
          />
        </div>
        <div className="relative">
          <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            disabled={loading}
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <Send size={20} /> {editId ? 'Update Instrument' : 'Add Instrument'}
              </>
            )}
          </button>
          {editId && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold text-lg shadow-md hover:bg-gray-400 transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
        {status && (
          <p
            className={`text-center mt-4 text-lg font-medium ${
              status.includes("successfully") ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default AddInstrument;
