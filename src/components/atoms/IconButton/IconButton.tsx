import { StyledIconButton } from './IconButton.styles';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string; // Obligatorio para accesibilidad
}

export const IconButton = ({ 
  icon, 
  label, 
  ...props 
}: IconButtonProps) => {
  return (
    <StyledIconButton 
      {...props} 
      aria-label={label}
      title={label} // Agrega un tooltip nativo del navegador
    >
      {icon}
    </StyledIconButton>
  );
};