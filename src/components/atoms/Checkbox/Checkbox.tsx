import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export const Checkbox = ({ checked, onChange, label }: CheckboxProps) => {
  return (
    <label className="checkbox-wrapper" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange}
        // El input es el que maneja el foco y el evento
      />
      <span className="checkmark" />
      {label && <span>{label}</span>}
    </label>
  );
};