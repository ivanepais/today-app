import { StyledTypography, TypographyVariant } from './Typography.styles';

interface TypographyProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'label';
}

export const Typography = ({ 
  variant = 'body', 
  children, 
  as = 'p' 
}: TypographyProps) => {
  return (
    <StyledTypography as={as} $variant={variant}>
      {children}
    </StyledTypography>
  );
};