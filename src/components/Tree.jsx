import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Tree.css";
import Loading from "./Loading";

function Tree() {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


const reqUrl = "https://linktrebackend.vercel.app"
// const reqUrl =  "http://127.0.0.1:5000"


  

  const navigate = useNavigate();

  useEffect(() => {

    // Fetch existing links from the server
    setLoading(true);
    const fetchLinks = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(reqUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setLoading(false);
        navigate("/signin");
        return;
      }

      const data = await response.json();
      setLinks(data);
      setLoading(false);
    };

    fetchLinks();
  }, [navigate]);

  //--------------  adding link------------------

  const handleAddLink = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await fetch(reqUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, url }),
      });

      const newLink = await response.json();

      if (!response.ok) {
        throw new Error(newLink.message);
      }
      setLinks([...links, newLink]);
      setTitle("");
      setUrl("");
    } catch (error) {
      setError(error.message);
    }finally{
      setLoading(false);
    }
  };

  // ---------delete link-------------

  const handleDeleteLink = async (id) => {
    console.log(id);

    const token = localStorage.getItem("token");
    setLoading(true);
    const response = await fetch(`${reqUrl}/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setLinks(links.filter((link) => link._id !== id));
      setLoading(false);
    } else {
      setLoading(false);
      console.error("Failed to delete link");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="linktree-container">
      {loading && <Loading />}
      <h2>Your Links</h2>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <form onSubmit={handleAddLink} className="linktree-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" className="button">
          Add Link
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <div className="links-list">
        {links.map((link) => (
          <div key={link._id} className="link-item">
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
            <button
              onClick={() => handleDeleteLink(link._id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tree;
