import React from "react";
import { useForm } from "react-hook-form";
import { auth } from "../firebase/firebase"; // Ensure this path is correct
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirect to home or dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <Helmet>
        <title>New Nirmal Musicals & Sons |SignUp</title>
        <meta
          name="description"
          content="Explore the finest collection of traditional and modern musical instruments. Trusted by musicians across India."
        />
        <meta
          name="keywords"
          content="musical instruments, tabla, harmonium, guitar, shop, India, music store"
        />
        <link rel="canonical" href="https://newnirmalmusicals.com/" />
      </Helmet>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Create Account
        </h2>

        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 mb-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">Email is required</p>
        )}

        <input
          {...register("password", { required: true, minLength: 6 })}
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 mb-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">
            Password must be at least 6 characters
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
