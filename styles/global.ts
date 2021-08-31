import { StyleSheet } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading1: {
    fontSize: moderateScale(42, 2),
    fontFamily: 'ws-regular',
  },
  heading2: {
    fontSize: scale(26),
    fontFamily: 'ws-medium',
  },
  body1: {
    fontSize: scale(16),
    fontFamily: 'ws-regular',
    lineHeight: scale(16 * 1.5),
  },
  body2: {
    fontSize: scale(13),
    fontFamily: 'ws-regular',
    lineHeight: scale(13 * 1.5),
  },
  caption: {
    fontSize: scale(10),
    fontFamily: 'ws-light',
    lineHeight: scale(10 * 1.5),
  },
  button: {
    fontSize: scale(14),
    fontFamily: 'ws-medium',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  titleBar: {
    fontSize: scale(13),
    fontFamily: 'ws-medium',
  },
  shadowElements: {
    shadowColor: 'rgba(0,0,0,.28)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  shadowNav: {
    shadowColor: 'rgba(0,0,0,.28)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
