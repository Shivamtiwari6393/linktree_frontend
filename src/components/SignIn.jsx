import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignIn.css";
import Loading from "./Loading";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //------------------ handle sign in --------------------

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("https://linktrebackend.vercel.app/api/users/signin", {
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
      navigate("/tree");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      {loading && <Loading />}
      <form onSubmit={handleSignIn} className="signin-form">
        <h2>Sign In</h2>
        <input
          type="email"
          placeholder="Email"
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
        <button type="submit" className="button">
          Sign In
        </button>
        {error && <p className="error-message">{error}</p>}
        <p>
          Do not have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
