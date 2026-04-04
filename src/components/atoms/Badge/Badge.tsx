import { StyledBadge } from './Badge.styles';

interface BadgeProps {
  count: number;
  overflowCount?: number;
}

export const Badge = ({ 
  count, 
  overflowCount = 99 
}: BadgeProps) => {
  // Si no hay nada que mostrar, el átomo es invisible
  if (count <= 0) return null;

  const displayCount = count > overflowCount ? `${overflowCount}+` : count;

  return (
    <StyledBadge 
      aria-label={`${count} notificaciones`}
      role="status"
    >
      {displayCount}
    </StyledBadge>
  );
};