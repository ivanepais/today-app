export const theme = {
  colors: {
    background: 'oklch(18% 0.04 258)',
    glass: 'oklch(100% 0 0 / 8%)',
    glassBorder: 'oklch(100% 0 0 / 15%)',
    primary: 'oklch(65% 0.22 255)',
    primaryHover: 'oklch(70% 0.22 255)',
    textPrimary: 'oklch(98% 0.01 255)',
    textSecondary: 'oklch(75% 0.05 255)',
    success: 'oklch(70% 0.18 145)',
    error: 'oklch(62% 0.22 25)',
    white: 'oklch(100% 0 0)',
  },

  // Tokens específicos de tipografía
  typography: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      md: '1rem',       // 16px
      lg: '1.5rem',     // 24px
      xl: '2.25rem',    // 36px
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    lineHeight: {
      tight: 1.1,
      normal: 1.5,
      relaxed: 1.6,
    }
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },

  borderRadius: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    full: '9999px', // Para Badges y botones redondos
  },

  effects: {
    blur: '12px',
    shadow: '0 8px 32px 0 oklch(0% 0 0 / 30%)',
  },

  // Gestión de capas (Z-Index)
  zIndex: {
    base: 1,
    dropdown: 10,
    sticky: 20,
    modal: 100,
  },

  // Animaciones consistentes
  transitions: {
    default: '0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    fast: '0.1s ease-in-out',
  }
};

export type ThemeType = typeof theme;