interface TypographyProps {
  variant?: 'title' | 'body' | 'label';
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'p' | 'span';
}

export const Typography = ({ variant = 'body', children, as = 'p' }: TypographyProps) => {
  const Component = as;
  return <Component className={`text-${variant}`}>{children}</Component>;
};