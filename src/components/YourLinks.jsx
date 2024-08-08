import { useParams } from "react-router-dom";

import "../styles/YourLinks.css";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function YourLink() {
  const { username } = useParams();
  const [links, setLinks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(username);
    setLoading(true);

    const fetchLinks = async () => {
      try {
        const response = await fetch(`https://linktrebackend.vercel.app/${username}`, {
          method: "post",
        });

        const links = await response.json();

        if (response.status == 404) {
          throw new Error("Url not Found");
        }

        if (response.ok) {
          setLinks(links);
        } else {
          throw new Error(links);
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, [username]);

  return (
    <div className="yourlink-container">
      {loading && <Loading />}

      {links ? (
        <>
          {" "}
          <h1>Your Links</h1>
          <ul>
            {links.map((link) => (
              <li key={link._id}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>{error && <p className="error-message">{error}</p>}</p>
      )}
    </div>
  );
}

export default YourLink;
