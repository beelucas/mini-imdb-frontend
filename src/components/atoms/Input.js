import React from 'react';

const Input = ({ type = 'text', name, value, onChange, placeholder, ...props }) => (
    <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} {...props} />
);

export default Input;
