import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../store/appContext';

export default function Nabvar() {
    const { store, actions } = useContext(Context);
    const history = useHistory();
    return (
        <ul className="nav justify-content-center py-3">

            {
                store.currentUser === null ?
                    (
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" to="/#" onClick={(e) => {
                                    e.preventDefault();
                                    actions.getLogout();
                                    history.push('/login');
                                }}>Logout</a>
                            </li>
                            <li className="nav-iten">
                                {
                                    store.currentUser?.user?.avatar !== "" ?
                                    (
                                        <img src={store.currentUser?.user?.avatar} alt="" width={40} height={40} className="rounded-circle" />
                                    ):(
                                        <img src="./profile.png" alt="" width={40} height={40} className="rounded-circle" />
                                    )
                                }
                            </li>
                        </>
                    )
            }

        </ul>
    )
}