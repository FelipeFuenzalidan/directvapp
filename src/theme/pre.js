import color from 'color'
import { Colors } from './Colors'

export const pre = {
  primary: Colors.PURPLE,
  secondary: Colors.AMBER,
  lightSecondary: color(Colors.AMBER)
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
