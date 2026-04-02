/**
 * Puntos de corte (breakpoints) estandarizados.
 * 1em = 16px (por defecto)
 */
export const breakpoints = {
  mobileS: '20em',    // 320px
  mobileM: '23.43em', // 375px
  mobileL: '26.56em', // 425px
  tablet: '48em',     // 768px
  laptop: '64em',     // 1024px
  laptopL: '90em',    // 1440px
  desktop: '160em',   // 2560px
};

/**
 * Helpers para usar en Styled Components.
 * Ejemplo: @media ${device.tablet} { ... }
 */
export const device = {
  mobileS: `(min-width: ${breakpoints.mobileS})`,
  mobileM: `(min-width: ${breakpoints.mobileM})`,
  mobileL: `(min-width: ${breakpoints.mobileL})`,
  tablet: `(min-width: ${breakpoints.tablet})`,
  laptop: `(min-width: ${breakpoints.laptop})`,
  laptopL: `(min-width: ${breakpoints.laptopL})`,
  desktop: `(min-width: ${breakpoints.desktop})`,
};

// Helper opcional para "Mobile First" (max-width) si fuera necesario
export const deviceMax = {
  mobileL: `(max-width: ${breakpoints.mobileL})`,
  tablet: `(max-width: ${breakpoints.tablet})`,
};