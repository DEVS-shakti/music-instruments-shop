import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Catalogue from "./Catalogue"; // Assuming Catalogue component is correctly implemented
import {
  Sparkles,
  Guitar,
  Headphones,
  Award,
  Users,
  Star,
  ChevronRight,
} from "lucide-react"; // Importing more icons for visual appeal

const Home = () => {
  // for Catalogue should be handled within the Catalogue component.

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>


      <section className="relative min-h-[90vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 py-16 overflow-hidden">
        {/* Background Sparkles/Glow */}
        <motion.div
          className="absolute inset-0 z-0 opacity-30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          <Sparkles className="absolute top-1/4 left-1/4 w-24 h-24 text-blue-300" />
          <Sparkles className="absolute bottom-1/3 right-1/4 w-32 h-32 text-purple-300" />
          <Sparkles className="absolute top-1/2 left-1/2 w-20 h-20 text-pink-300" />
        </motion.div>

        <motion.div
          className="max-w-4xl text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight drop-shadow-lg"
            variants={itemVariants}
          >
            Welcome to{" "}
            <span className="text-blue-600 animate-pulse-slow">
              New Nirmal Musicals & Sons
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Discover the finest collection of traditional and modern musical
            instruments curated with passion and precision. Your journey into
            the world of music begins here.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link
              to="/catalogue"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transform transition-all duration-300 text-lg font-semibold group"
            >
              <span className="mr-2 group-hover:animate-spin-slow">🎵</span>{" "}
              Browse Instruments
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative Floating Notes */}
        <motion.div
          className="absolute bottom-10 right-10 text-6xl text-pink-300 select-none opacity-50"
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          🎶
        </motion.div>
        <motion.div
          className="absolute top-10 left-10 text-5xl text-blue-300 select-none opacity-50"
          animate={{ y: [0, 20, 0], rotate: [0, -5, 5, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          🎼
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-12">
          Why Choose Us?
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <Award className="w-16 h-16 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Quality Guaranteed
            </h3>
            <p className="text-gray-600">
              Every instrument is hand-picked and tested to ensure superior
              sound and craftsmanship.
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Users className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Expert Support
            </h3>
            <p className="text-gray-600">
              Our team of musicians is always ready to assist you with advice
              and guidance.
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Star className="w-16 h-16 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Customer Satisfaction
            </h3>
            <p className="text-gray-600">
              We pride ourselves on providing an exceptional shopping experience
              for every customer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Instruments Section (from Catalogue component) */}
      <section className="py-16">
        <Catalogue />
      </section>

      {/* Call to Action Section */}
    </>
  );
};

export default Home;
