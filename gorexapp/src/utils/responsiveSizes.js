import {PixelRatio, Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
// const { height: SCREEN_HEIGHT_WITH_STATUSBAR } = Dimensions.get('screen');
// let SCREEN_ABSOLUTE_HEIGHT = null;

// based on iphone 8 scale
// const scale = SCREEN_WIDTH / 375;

const dimensionPercentToDP = (valuePercent, dimensionValue) =>
  PixelRatio.roundToNearestPixel(
    (dimensionValue * parseFloat(valuePercent)) / 100,
  );

const wp = width => {
  const widthPercent = (width / 375) * 100;
  return dimensionPercentToDP(widthPercent, SCREEN_WIDTH);
};

const hp = height => {
  const heightPercent = (height / 812) * 100;
  return dimensionPercentToDP(heightPercent, SCREEN_HEIGHT);
};

// const heightPercentageToDPFull = (heightPercent) =>
//   dimensionPercentToDP(heightPercent, SCREEN_HEIGHT_WITH_STATUSBAR);

const responsiveFontSize = fontSize => {
  return PixelRatio.roundToNearestPixel(fontSize / PixelRatio.getFontScale());
};

// const normalize = (size) => {
//   const newSize = size * scale;
//   if (Platform.OS === 'ios') {
//     return Math.round(PixelRatio.roundToNearestPixel(newSize));
//   } else {
//     return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
//   }
// };

// const responsiveVerticalSize = (size) => {
//   const screenHeight = Dimensions.get('window').height;
//   // Convert string input to decimal number
//   const elemHeight = parseFloat(size);
//   return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
// };

// const responsiveHorizontalSize = (size) => {
//   const screenWidth = Dimensions.get('window').width;
//   // Convert string input to decimal number
//   const elemHeight = parseFloat(size);
//   return PixelRatio.roundToNearestPixel((screenWidth * elemHeight) / 100);
// };

// const setAbsHeight = (height) => {
//   SCREEN_ABSOLUTE_HEIGHT = height;
// };

export {
  wp,
  hp,
  responsiveFontSize,
  // normalize,
  // responsiveVerticalSize,
  // responsiveHorizontalSize,
  // SCREEN_HEIGHT,
  // SCREEN_WIDTH,
  // SCREEN_HEIGHT_WITH_STATUSBAR,
  // heightPercentageToDPFull,
  // SCREEN_ABSOLUTE_HEIGHT,
  // setAbsHeight,
};
