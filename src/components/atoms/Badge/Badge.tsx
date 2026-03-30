interface BadgeProps {
  count: number;
  overflowCount?: number;
}

export const Badge = ({ count, overflowCount = 99 }: BadgeProps) => {
  if (count <= 0) return null;

  const displayCount = count > overflowCount ? `${overflowCount}+` : count;

  return (
    <span className="badge-count" aria-label={`${count} notificaciones`}>
      {displayCount}
    </span>
  );
};