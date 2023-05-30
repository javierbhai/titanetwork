import React from 'react';
import './styles.css'

const Header = props => <header className={`${!props.className && `header-container`}`} {...props}>{props.children}</header>

export default Header;
