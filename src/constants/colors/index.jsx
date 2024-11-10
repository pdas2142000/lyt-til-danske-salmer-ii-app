// export const Colors = {
//   primary: '#097C37',
//   dark: '#212121',
//   light: 'rgba(0, 0, 0, 0.5)',
//   text: '#050e1d',
//   bg: '#F5F7F9',
// };
// //text lighter ="#9c9c9c"
export const DEFAULT_COLORS = {
  background: '#fff',
  lighterBackground: '#F5F7F9',
  primary: '#000000',
  text: '#000000',
  lighterText: 'rgba(0, 0, 0, 0.5)',
  buttonBackground: '#000000',
  buttonBorder: '#000000',
  buttonText: '#ffffff',
  transparentBlack: 'rgba(0, 0, 0, 0.5)',
  PlayButtonBackground: '#000000',
  PlayButtonText: '#ffffff',
};

export const APP_COLORS = {
  ...DEFAULT_COLORS
};

export const GenerateColorsObject = ({
  background = DEFAULT_COLORS.background,
  lighterBackground = DEFAULT_COLORS.lighterBackground,
  primary = DEFAULT_COLORS.primary,
  text = DEFAULT_COLORS.text,
  lighterText = DEFAULT_COLORS.lighterText,
  buttonBackground = DEFAULT_COLORS.buttonBackground,
  buttonBorder = DEFAULT_COLORS.buttonBorder,
  buttonText = DEFAULT_COLORS.buttonText,
  transparentBlack = DEFAULT_COLORS.transparentBlack,
  PlayButtonBackground = DEFAULT_COLORS.PlayButtonBackground,
  PlayButtonText = DEFAULT_COLORS.PlayButtonText,
}) => {
  let GeneratedColors = {...APP_COLORS};
  GeneratedColors.background = background;
  GeneratedColors.lighterBackground = lighterBackground;
  GeneratedColors.primary = primary;
  GeneratedColors.text = text;
  GeneratedColors.lighterText = lighterText;
  GeneratedColors.buttonBackground = buttonBackground;
  GeneratedColors.buttonBorder = buttonBorder;
  GeneratedColors.buttonText = buttonText;
  GeneratedColors.transparentBlack = transparentBlack;
  GeneratedColors.PlayButtonBackground = PlayButtonBackground;
  GeneratedColors.PlayButtonText = PlayButtonText;
  return GeneratedColors;
};
