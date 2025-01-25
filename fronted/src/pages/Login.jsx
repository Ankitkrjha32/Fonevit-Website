import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up"); // "Sign Up", "Login", "Verify OTP"
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");  // Email state
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // OTP state
  const [demoCredentialsSet, setDemoCredentialsSet] = useState(false); 

  // Handle form submit for Sign Up or Login
  const handleSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "Sign Up") {
        // Sign-up logic
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          toast.success("OTP sent to your email");
          setCurrentState("Verify OTP"); // Move to OTP verification after successful signup
          // toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
      else if (currentState === "Login") {
        // Login logic
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          navigate("/"); // Redirect on successful login
        } else {
          toast.error(response.data.message);
        }
      } else if (currentState === "Verify OTP") {
        // OTP verification logic
        const response = await axios.post(`${backendUrl}/api/user/verifyEmail`, {
          email,
          otp,
        });
        console.log(response.data);

        if (response.data.success) {
          toast.success("Account Created Sucessfully", {
            autoClose: 3000, // Set time for auto-close (in ms)
            position: "top-right", // Set the position of the toast
            hideProgressBar: true, // Hide the progress bar
            closeOnClick: true, // Toast closes when clicked
          });
          // setCurrentState("Login"); // After OTP verification, allow login
          navigate("/"); // Redirect on successful OTP verification
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (currentState === "Login" && !demoCredentialsSet) {
      // Show toast and set demo credentials for Login
     
      toast.success("Demo credentials filled for testing", {
        autoClose: 2000, // Set time for auto-close (in ms)
        position: "top-right", // Set the position of the toast
        hideProgressBar: true, // Hide the progress bar
        closeOnClick: true, // Toast closes when clicked
      });
      setEmail("test@example.com");
      setPassword("Password@56");
      setDemoCredentialsSet(true); // Set flag to prevent demo credentials from being set again
    } else if (currentState === "Verify OTP") {
      // In Verify OTP, preserve email value for OTP verification
      setDemoCredentialsSet(false); // Ensure demo credentials are not used for OTP
      setPassword(""); // Clear password for OTP verification stage
    } else if (currentState === "Sign Up") {
      // Prevent demo credentials from being auto-filled during Sign Up
      setEmail(""); // Clear email when switching to Sign Up
      setPassword(""); // Reset password field for Sign Up
      setDemoCredentialsSet(false); // Ensure demo credentials are not used for Sign Up
    }
  }, [currentState, demoCredentialsSet]);
  

  useEffect(() => {
    if (token) {
      navigate("/"); // Redirect to home if token is available
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={handleSubmitHandler}
      className="flex flex-col items-center w-[90%] m-auto sm:max-w-96 mt-14 gap-4 text-gray-700"
    >
      <div className="flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <p className="border-none h-[1.5px] w-8 bg-gray-800"></p>
      </div>
      {currentState === "Login" || currentState === "Verify OTP" ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          type="text"
          placeholder="Name"
          required
        />
      )}
      {/* Email field: Display email and readonly during OTP verification */}
      <input
      className={`w-full px-3 py-2 border border-gray-800 ${currentState === "Verify OTP" ? "bg-gray-200 cursor-not-allowed" : ""}`}
      type="text"
      value={email}
      placeholder= "Email"
      required
      readOnly={currentState === "Verify OTP"} // Makes the input readonly during OTP verification
      onChange={(e) => setEmail(e.target.value)} // Only allows changes when not in OTP verification state
    />

      {/* Password field: Hide during OTP verification */}
      {currentState !== "Verify OTP" && (
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          type="password"
          value={password}
          placeholder="Password"
          required
        />
      )}
      {currentState === "Verify OTP" && (
        <input
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          type="text"
          value={otp}
          placeholder="Enter OTP"
          required
        />
      )}

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your Password</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>
      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currentState === "Sign Up"
          ? "Sign Up"
          : currentState === "Verify OTP"
            ? "Verify OTP"
            : "Login"}
      </button>
    </form>
  );
};

export default Login;
