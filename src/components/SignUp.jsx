import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import Loading from "./Loading";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // const reqUrl = "http://127.0.0.1:5000"
  const reqUrl = "https://linktrebackend.vercel.app"


  //----------------- handle sign up--------------

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${reqUrl}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
      navigate("/signIn");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const goSignIn = () => {
    navigate("/signIn");
  };

  return (
    <div className="signup-container">
      {loading && <Loading />}
      <form onSubmit={handleSignUp} className="signup-form">
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Username/Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="button">
          Sign Up
        </button>
        {error && <p className="error-message">{error}</p>}
        <p>
          Already have an account? <span onClick={goSignIn}>Sign In</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
