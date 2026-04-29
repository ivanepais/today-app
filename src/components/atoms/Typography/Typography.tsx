import { StyledTypography, type TypographyVariant } from './Typography.styles';

interface TypographyProps {
  id?: string;
  variant?: TypographyVariant;
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'label';
  htmlFor?: string;
}

export const Typography = ({
  id,
  variant = 'body',
  children,
  as = 'p',
  htmlFor,
}: TypographyProps) => {
  return (
    <StyledTypography id={id} as={as} $variant={variant} htmlFor={htmlFor}>
      {children}
    </StyledTypography>
  );
};
