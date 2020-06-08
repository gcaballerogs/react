import React from 'react';
import logo from '../images/logo.png';


const Header = () => (

    <header id="header">
        <div className="wrapper">
            <a href="http://www.burodecredito.com.mx" className="logo">
                <img src={logo} alt="Buró de crédito" /></a>
            <span>MDC</span>
        </div>
    </header>
);

export default Header;