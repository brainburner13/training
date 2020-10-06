import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
     <header className={s.header}>
       <img src='https://c7.hotpng.com/preview/182/85/212/nasa-insignia-independent-verification-and-validation-facility-logo-clip-art-nasa.jpg' alt=''/>
       <div className={s.loginBlock}>
         {props.isAuth 
         ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div> 
         : <NavLink to={'/login'}>Login</NavLink>}
       </div>
     </header>
    )
};

export default Header;

