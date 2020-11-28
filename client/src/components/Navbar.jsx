import React ,{ useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {NavLink} from 'react-router-dom'
import "./../App.css"


export const Navbar = () => {
   const auth = useContext(AuthContext)
   
    const logoutHandler = event=>{
        event.preventDefault()
        auth.logout()
        

    }
    
    return (
        
        <nav className="teal darken-4 black-text">
        <div className="nav-wrapper black-text ">
          <span  className="brand-logo grey-text ">Сокращение ссылок </span>
          <ul id="nav-mobile" className="right hide-on-med-and-down black-text">
            <li><NavLink to="/create" className="grey-text link">Создать</NavLink></li>
            <li><NavLink to="/links" className="grey-text link">Ссылки</NavLink></li>
            <li><a href='/' onClick={logoutHandler} className="grey-text link">Выйти</a></li>
          </ul>
        </div>
      </nav>
      
     
    );
};

