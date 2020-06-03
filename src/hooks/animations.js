import { useMemo, useEffect } from 'react'
import { Animated } from 'react-native'

export function useAnimatedToast(visible = false, toastHeight) {
  const { style, value } = useMemo(() => {
    const animatedValue = new Animated.Value(0)

    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-toastHeight, -10],
    })

    const animatedStyle = {
      transform: [{ translateY }],
    }

    return { style: animatedStyle, value: animatedValue }
  }, [toastHeight])

  useEffect(() => {
    Animated.spring(value, {
      toValue: visible ? 1 : 0,
      useNativeDriver: true,
    }).start()
  }, [visible, value])

  return style
}
