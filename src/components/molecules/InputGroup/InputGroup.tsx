/*
import { Badge } from '../../atoms/Badge/Badge';

interface InputGroupProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  placeholder?: string;
}

export const InputGroup = ({ 
  label, 
  value, 
  onChange, 
  maxLength = 100, 
  placeholder 
}: InputGroupProps) => {
  const remaining = maxLength - value.length;

  return (
    <div className="input-group">
      <div className="input-group-header">
        <label className="input-label">{label}</label>
        {value.length > 0 && (
          <Badge count={remaining} overflowCount={maxLength} />
        )}
      </div>
      
      <input
        type="text"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
};

*/

import { useId } from 'react';
import { Badge } from '../../atoms/Badge/Badge';

interface InputGroupProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  placeholder?: string;
}

export const InputGroup = ({ 
  label, 
  value, 
  onChange, 
  maxLength = 100, 
  placeholder 
}: InputGroupProps) => {
  const remaining = maxLength - value.length;
  const inputId = useId(); // Generamos un ID único

  return (
    <div className="input-group">
      <div className="input-group-header">
        {/* Vinculamos el label con el id del input */}
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
        {value.length > 0 && (
          <Badge count={remaining} overflowCount={maxLength} />
        )}
      </div>
      
      <input
        id={inputId} // Asignamos el ID al input
        type="text"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
};