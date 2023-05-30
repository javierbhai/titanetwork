import React from 'react';
import classNames from 'classnames';

import Image from "../../components/atoms/Image";

import logo from '../../liga-tita.png';
import './styles.css'

const Login = ({ isLoggedin }) => {
    const classes = classNames({ 'login': true, 'loggedin': isLoggedin })

    return (
        <section className={classes}>
            <Image src={logo} alt='logo' />
            <div className='login-action'>
                <p className='login-cta'>Join us</p>
                <div id="signInDiv"></div>
            </div>
        </section>
    )
}

export default Login;