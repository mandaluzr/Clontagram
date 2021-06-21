import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';


function LoginRoutes() {
    return (
        <>
        <li className="Nav__link-push">
        <Link className="Nav__link" to="/upload">
            <FontAwesomeIcon icon={faCameraRetro} ></FontAwesomeIcon>    
         </Link>
        </li>
        </>
    )
}

const Nav = ({ usuario }) => {
    return (
        <nav className="Nav">
            <ul className="Nav__links">
                <li>
                    <Link to="/" className="Nav__link">
                        Clontagram By Marquitos
                    </Link>
                </li>
                { usuario && <LoginRoutes /> }
            </ul>
        </nav>
    )
}

export default Nav;