import { login, logout } from '../services/firebase';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <nav className="nav">
      <Link to="/">
        <div>Weather App</div>
      </Link>
      <ul>
        {props.user ? (
          <>
            <li>Welcome, {props.user.displayName}</li>
            <li>
              <img src={props.user.photoURL} alt={props.user.displayName} />
            </li>
            <li className="logout" onClick={logout}>
              Logout
            </li>
          </>
        ) : (
          <li className="login" onClick={login}>
            Login
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Header;
