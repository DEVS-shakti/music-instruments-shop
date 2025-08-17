import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion for animations
import { Phone, MapPin, MessageSquare, Home as HomeIcon, BookOpen, Mail } from 'lucide-react'; // Import Lucide icons

const Footer = () => {
  // Animation variants for the main container
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren", // Animate container before children
        staggerChildren: 0.2, // Stagger children animations
      },
    },
  };

  // Animation variants for individual sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      className="bg-gray-900 text-white py-12 px-6 sm:px-12 mt-4 shadow-inner"
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      // Use whileInView if you want it to animate as it enters the viewport
      // whileInView="visible"
      // viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* About Section */}
        <motion.div variants={sectionVariants}>
          <h3 className="text-2xl font-bold mb-4 text-blue-300">New Nirmal Musicals & Sons</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Showcasing quality musical instruments with tradition and trust. Serving passionate musicians since <span className="font-semibold">1985</span>. Your journey into harmony starts here.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={sectionVariants}>
          <h4 className="text-xl font-semibold mb-4 text-purple-300">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <Link to="/" className="flex items-center justify-center md:justify-start text-gray-300 hover:text-blue-400 transition-colors duration-200 group">
                <HomeIcon size={18} className="mr-2 group-hover:scale-110 transition-transform" /> Home
              </Link>
            </li>
            <li>
              <Link to="/catalogue" className="flex items-center justify-center md:justify-start text-gray-300 hover:text-blue-400 transition-colors duration-200 group">
                <BookOpen size={18} className="mr-2 group-hover:scale-110 transition-transform" /> Catalogue
              </Link>
            </li>
            <li>
              <Link to="/contact" className="flex items-center justify-center md:justify-start text-gray-300 hover:text-blue-400 transition-colors duration-200 group">
                <Mail size={18} className="mr-2 group-hover:scale-110 transition-transform" /> Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={sectionVariants}>
          <h4 className="text-xl font-semibold mb-4 text-green-300">Contact Us</h4>
          <p className="text-sm text-gray-300 flex items-center justify-center md:justify-start mb-2">
            <Phone size={16} className="mr-2 text-blue-400" /> 📞 +91 8102467065
          </p>
          <p className="text-sm text-gray-300 flex items-center justify-center md:justify-start mb-4">
            <MapPin size={16} className="mr-2 text-red-400" /> 📍 Hazaribagh, Jharkhand, India
          </p>
          <a
            href="https://wa.me/918102467065" // Corrected WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-600 text-white px-5 py-2.5 rounded-full shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105 font-semibold group"
          >
            <MessageSquare size={20} className="mr-2 group-hover:rotate-6 transition-transform" /> Chat on WhatsApp
          </a>
        </motion.div>
      </div>

      <motion.div
        className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        &copy; {new Date().getFullYear()} New Nirmal Musicals & Sons. All rights reserved.
        <p className="mt-1">Handcrafted with passion for music lovers worldwide.</p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
