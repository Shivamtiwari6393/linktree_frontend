import { useLocation } from 'react-router-dom';
import '../styles/YourLinks.css';

function YourLink() {
  const location = useLocation();
  const links = location.state?.links || [];

  return (
    <div className="yourlink-container">
      <h1>Your Links</h1>
      <ul>
        {links.map(link => (
          <li key={link._id}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default YourLink;
