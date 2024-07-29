import React from 'react';

const Textarea = ({ name, value, onChange, placeholder, ...props }) => (
    <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} {...props}></textarea>
);

export default Textarea;
