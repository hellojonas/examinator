import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading1: {
    fontSize: 42,
    fontFamily: 'ws-regular',
  },
  heading2: {
    fontSize: 26,
    fontFamily: 'ws-medium',
  },
  body1: {
    fontSize: 16,
    fontFamily: 'ws-regular',
    lineHeight: 16 * 1.5,
  },
  body2: {
    fontSize: 13,
    fontFamily: 'ws-regular',
    lineHeight: 13 * 1.5,
  },
  caption: {
    fontSize: 10,
    fontFamily: 'ws-light',
    lineHeight: 10 * 1.5,
  },
  button: {
    fontSize: 14,
    fontFamily: 'ws-medium',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  titleBar: {
    fontSize: 13,
    fontFamily: 'ws-medium',
  },
  shadowElements: {
    shadowColor: '#000',
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
