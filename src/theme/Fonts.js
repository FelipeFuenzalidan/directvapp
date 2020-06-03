import { Platform } from 'react-native'

/*
 * Enum
 */

export const Fonts = Object.freeze(
  Platform.select({
    ios: {
      dtvcurve: {
        ultra: 'DIRECTVCurve-Ultra', // 900
        black: 'DIRECTVCurve-Black', // 800
        bold: 'DIRECTVCurve-Bold', // 700
        medium: 'DIRECTVCurve-Medium', // 500
        regular: 'DIRECTVCurve-Regular', // 400
        light: 'DIRECTVCurve-Light', // 200
        italicUltra: 'DIRECTVCurve-UltraItalic', // 900
        italicBlack: 'DIRECTVCurve-BlackItalic', // 800
        italicBold: 'DIRECTVCurve-BoldItalic', // 700
        italicMedium: 'DIRECTVCurve-MediumItalic', // 500
        italicRegular: 'DIRECTVCurve-Italic', // 400
        italicLight: 'DIRECTVCurve-LightItalic', // 200
      },
      palanquin: {
        bold: 'Palanquin-Bold', // 700
        semiBold: 'Palanquin-SemiBold', // 600
        medium: 'Palanquin-Medium', // 500
        regular: 'Palanquin-Regular', // 400
        light: 'Palanquin-Light', // 300
        extraLight: 'Palanquin-ExtraLight', // 200
        thin: 'Palanquin-Thin', // 100
        darkRegular: 'PalanquinDark-Regular',
        darkMedium: 'PalanquinDark-Medium',
        darkSemiBold: 'PalanquinDark-Semibold',
        darkBold: 'PalanquinDark-Bold',
      },
    },
    android: {
      dtvcurve: {
        ultra: 'dtvcurve-ultra', // 900
        black: 'dtvcurve-black', // 800
        bold: 'dtvcurve-bold', // 700
        medium: 'dtvcurve-medium', // 500
        regular: 'dtvcurve-regular', // 400
        light: 'dtvcurve-light', // 200
        italicUltra: 'dtvcurve-ultra-italic', // 900
        italicBlack: 'dtvcurve-black-italic', // 800
        italicBold: 'dtvcurve-bold-italic', // 700
        italicMedium: 'dtvcurve-medium-italic', // 500
        italicRegular: 'dtvcurve-regular-italic', // 400
        italicLight: 'dtvcurve-light-italic', // 200
      },
      palanquin: {
        bold: 'palanquin-bold', // 700
        semiBold: 'palanquin-semibold', // 600
        medium: 'palanquin-medium', // 500
        regular: 'palanquin-regular', // 400
        light: 'palanquin-light', // 300
        extraLight: 'palanquin-extralight', // 200
        thin: 'palanquin-thin', // 100
        darkRegular: 'palanquindark-regular',
        darkMedium: 'palanquindark-medium',
        darkSemiBold: 'palanquindark-semibold',
        darkBold: 'palanquindark-bold',
      },
    },
  })
)
