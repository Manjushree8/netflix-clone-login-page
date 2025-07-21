import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import netflixLogo from "../images/Netflixlogo.png";
import loginbg from "../images/loginbg.jpg";

function Signup() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !pass) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.post("https://netflix-clone-1p4s.onrender.com/SignUp", {
        email,
        password: pass,
      });

      if (res.status === 201) {
        navigate("/dashboard");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Server error. Please try again later.");
      }
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
      <img
        src={loginbg}
        alt="Background"
        className="hidden sm:block fixed inset-0 w-full h-full object-cover -z-10"
      />
      <div className="fixed inset-0 bg-black bg-opacity-100 sm:bg-opacity-70 -z-10"></div>

      <img
        src={netflixLogo}
        alt="Netflix Logo"
        className="absolute top-0 left-2 sm:left-2 md:left-6 lg:left-48 w-32 sm:w-36 md:w-44 z-20"
      />

      <div className="relative z-30 bg-black bg-opacity-70 text-white p-8 sm:p-12 rounded max-w-lg w-[95%] sm:w-[450px] mt-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Sign Up</h1>
        {error && <p className="text-[#e87c03] text-sm mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#333] p-4 rounded text-white placeholder-[#b3b3b3] border border-[#8c8c8c] focus:outline-none focus:border-[#e50914]"
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="bg-[#333] p-4 rounded text-white placeholder-[#b3b3b3] border border-[#8c8c8c] focus:outline-none focus:border-[#e50914]"
          />
          <button
            type="submit"
            className="bg-[#e50914] hover:bg-[#f6121d] p-4 rounded font-semibold text-white text-lg transition"
          >
            Sign Up
          </button>
        </form>
        <div className="text-[#737373] mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-white hover:underline">
            Sign in now.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;