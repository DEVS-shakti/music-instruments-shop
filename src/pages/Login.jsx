import React from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../firebase/firebase'; // Ensure this path is correct
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // you can redirect to dashboard or catalogue
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <Helmet>
        <title>Login</title>
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
          Login
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
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 mb-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">Password is required</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
