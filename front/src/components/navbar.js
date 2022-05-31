import { Link } from 'react-router-dom';

export default function Nabvar() {
    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
            </li>
        </ul>
    )
}