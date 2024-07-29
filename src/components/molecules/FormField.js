import React from 'react';
import Input from '../atoms/Input';
import Textarea from '../atoms/Textarea';

const FormField = ({ label, type = 'text', name, value, onChange, isTextarea = false, placeholder }) => (
    <div>
        <label htmlFor={name}>{label}</label>
        {isTextarea ? (
            <Textarea name={name} value={value} onChange={onChange} placeholder={placeholder} />
        ) : (
            <Input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
        )}
    </div>
);

export default FormField;
