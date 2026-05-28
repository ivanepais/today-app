import { StyledIconButton } from './IconButton.styles';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string; // accessibility
}

export const IconButton = ({ icon, label, ...props }: IconButtonProps) => {
  return (
    <StyledIconButton
      {...props}
      aria-label={label}
      title={label} // Add a native browser tooltip
    >
      {icon}
    </StyledIconButton>
  );
};
