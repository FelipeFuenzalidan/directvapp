import React, { useState, useMemo, useCallback, useRef } from 'react'
import { Image, TouchableWithoutFeedback, Animated } from 'react-native'
import styled from 'styled-components/native'

export const ImageBanner = () => {
  const [bannerImage, switchBanner] = useSwitchableBanner()
  const { style: imageStyle, animate } = useSubtleScaleAnimation()

  return (
    <>
      <TouchableWithoutFeedback onPress={switchBanner}>
        <Banner as={Animated.Image} source={bannerImage} onLoad={animate} style={imageStyle} />
      </TouchableWithoutFeedback>
      <BannerGlow source={require('~/../assets/images/banner-glow.png')} />
    </>
  )
}

/**
 * Styled components
 */
const Banner = styled(Animated.Image)({
  height: 340,
  width: '100%',
})

const BannerGlow = styled(Image)({
  position: 'absolute',
  top: 0,
  height: 100,
  width: '100%',
  resizeMode: 'stretch',
})

/**
 * Hooks
 */
function useSwitchableBanner() {
  const [showAlternative, setShowAlternative] = useState(false)

  const image = useMemo(() => {
    return showAlternative ? require('~/../assets/images/banner-alt.png') : require('~/../assets/images/banner.png')
  }, [showAlternative])

  const switchImage = useCallback(() => setShowAlternative(previous => !previous), [])

  return [image, switchImage]
}

function useSubtleScaleAnimation() {
  const animatedValueRef = useRef(new Animated.Value(0))

  const animate = useCallback(() => {
    animatedValueRef.current.setValue(0)
    Animated.spring(animatedValueRef.current, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }, [])

  const animatedStyle = useMemo(
    () => ({
      transform: [
        {
          scale: animatedValueRef.current.interpolate({
            inputRange: [0, 1],
            outputRange: [1.05, 1.03],
          }),
        },
      ],
    }),
    []
  )

  return { style: animatedStyle, animate }
}
