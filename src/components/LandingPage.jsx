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

  //------------- handle form submit-------

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const username = url.split("/").pop();
      navigate(`/mytree/${username}`);
    } catch (error) {
      console.log(error);
      setError("Invalid URL");
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
        <h1>Welcome to Trelinkk</h1>
        <p>Your one-stop solution to share all your links in one place.</p>
        <p>
          Create your personalized link collection and share it with the world.
        </p>
        <button className="button" onClick={goSignIn}>
          Get Started
        </button>

        <form onSubmit={handleSubmit}>
          <div className="yourlinks">
            <input
              type="url"
              name="url"
              id="url"
              placeholder="https://trelinkk.vercel.app/mytree/username"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" id="getbutton">
            Get Links
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LandingPage;
