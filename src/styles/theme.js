import { createMuiTheme } from '@material-ui/core/styles';

export const breakpoints = {
  xsmall: '(min-width: 0px)',
  small: '(min-width: 600px)',
  medium: '(min-width: 960px)',
  large: '(min-width: 1280px)',
  xlarge: '(min-width: 1920px)',
};

export const fonts = {
  xsmall: '0.75rem',
  small: '0.875rem',
  medium: '1rem',
  large: '1.125rem',
  light: '300',
  regular: '400',
  semibold: '500',
  bold: '700',
};

export const palette = {
  white: '#FFFFFF',
  drWhite: '#FAFAFA',
  krylonSun: '#F9D71C',
  vermilionBird: '#F44336',
  pervenche: '#039AE5',
  lavaStone: '#3C4252',
  black: '#000000',
};

export const colors = {
  primary: palette.lavaStone,
  secondary: palette.krylonSun,
  accent: palette.krylonSun,
  text: 'rgba(0, 0, 0, 0.87)',
  altText: {
    contrast: palette.white,
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
  },
  background: palette.lavaStone,
  divider: 'rgba(0, 0, 0, 0.12)',
  error: palette.vermilionBird,
};

export default createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
      contrastText: colors.altText.contrast,
    },
    secondary: {
      main: colors.secondary,
      contrastText: colors.altText.contrast,
    },
    text: {
      primary: colors.text,
      secondary: colors.altText.secondary,
      disabled: colors.altText.disabled,
      hint: colors.altText.hint,
    },
    background: {
      default: colors.background,
      paper: palette.white,
    },
    divider: colors.divider,
    error: {
      main: palette.vermilionBird,
      contrastText: colors.altText.contrast,
    },
  },
});
