import color from 'color'
import { Colors } from './Colors'

export const post = {
  primary: Colors.INDIGO,
  secondary: Colors.LIGHT_BLUE_500,
  lightSecondary: color(Colors.LIGHT_BLUE_500)
    .alpha(0.52)
    .rgb()
    .string(),
  disabled: Colors.DISABLED,
  transparent: 'rgba(0, 0, 0, 0.16)',
  whiteText: Colors.WHITE,
  disabledWhiteText: color(Colors.WHITE)
    .alpha(0.52)
    .rgb()
    .string(),
}
