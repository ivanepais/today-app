interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  label: string; // Crucial para accesibilidad (screen readers)
  disabled?: boolean;
}

export const IconButton = ({ icon, onClick, label, disabled }: IconButtonProps) => {
  return (
    <button onClick={onClick} aria-label={label} disabled={disabled}>
      {icon}
    </button>
  );
};