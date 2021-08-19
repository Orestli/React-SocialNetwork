import React from "react";
import './header.css'
import {NavLink} from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <div className="header-title">
                <span>Discord</span>
            </div>

            <a href="/"><img className="header-link" src="https://upload.wikimedia.org/wikipedia/ru/thumb/b/b7/Discord_logo_svg.svg/1200px-Discord_logo_svg.svg.png" alt=""/></a>

            <nav>
                <ul className="nav">
                    <li className="nav-item"><NavLink to="/profile" className="nav-link">Profile</NavLink></li>
                    <li className="nav-item"><NavLink to="/messenger" className="nav-link">Messenger</NavLink></li>
                    <li className="nav-item"><NavLink to="/users" className="nav-link">Users</NavLink></li>
                    <li className="nav-item"><NavLink to="/news" className="nav-link">News</NavLink></li>
                    <li className="nav-item"><NavLink to="/music" className="nav-link">Music</NavLink></li>
                    <li className="nav-item"><NavLink to="/settings" className="nav-link">Settings</NavLink></li>
                </ul>
            </nav>
            <div className="header-user header-login">
                {
                    props.isAuth ?
                        <div>
                            {props.login} - <button onClick={props.logout}>Log out</button>
                        </div> :
                        <NavLink to={'/login'}>
                            Login
                        </NavLink>
                }
            </div>
        </header>
    )
}

export default Header