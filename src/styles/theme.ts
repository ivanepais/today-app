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

  typography: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: {
      xxs: '0.625rem', // 10px
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      md: '1rem', // 16px
      lg: '1.5rem', // 24px
      xl: '2.25rem', // 36px
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
    },
  },

  spacing: {
    xxs: '0.125rem',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '2.25rem',
  },

  bordersAndShadows: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },

  borderRadius: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    full: '9999px', // Badges and Buttons
  },

  effects: {
    blur: '12px',
  },

  shadows: {
    glassElevated: '0 30px 60px oklch(0% 0 0deg / 30%), inset 0 1px 0 oklch(100% 0 0deg / 12%)',
  },

  zIndex: {
    base: 1,
    dropdown: 10,
    sticky: 20,
    modal: 100,
  },

  /* Animations */
  transitions: {
    default: '0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    fast: '0.1s ease-in-out',
  },
};

export type ThemeType = typeof theme;
