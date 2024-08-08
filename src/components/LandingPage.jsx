import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import { useState } from "react";
import Loading from "./Loading";

function LandingPage() {
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  //------------ fetching links------------

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "post",
      });

      const links = await response.json();

      if (response.ok) {
        navigate(`/YourLinks`, { state: { links } });
      } else {
        throw new Error(links);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  //------------- navigate to sign in component-------

  const goSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="landing-container">
      {loading && <Loading />}
      <div className="overlay">
        <h1>Welcome to Linktree</h1>
        <p>Your one-stop solution to share all your links in one place.</p>
        <p>
          Create your personalized link collection and share it with the world.
        </p>
        <button className="button" onClick={goSignIn}>
          Get Started
        </button>

        <div className="yourlinks">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="http://127.0.0.1:5000/username"
            onChange={handleChange}
          />
        </div>
        <button id="getbutton" onClick={fetchLinks}>
          Get Links
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default LandingPage;
