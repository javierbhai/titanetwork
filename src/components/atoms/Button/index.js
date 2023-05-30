import React from 'react';
import './styles.css'

const Button = props => <button className={`${!props.className && `action-button`}`} {...props}>{props.children}</button>;

export default Button;
