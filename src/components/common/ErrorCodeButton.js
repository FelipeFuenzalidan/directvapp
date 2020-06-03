/* eslint-disable no-console */
import React, { useRef, useCallback, useEffect } from 'react'
import { Text, Animated, View, StyleSheet, Easing, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { ThrottledTouchableOpacity } from './ThrottledTouchableOpacity'
import { Colors } from '~/theme/Colors'
import { Fonts } from '~/theme/Fonts'

/*
 * Constants
 */

export const BAR_WIDTH = 220
export const BAR_HEIGHT = 50

/*
 * Hooks
 */

const useProgressBarStyles = animatedProgressValue => ({
  transform: [
    {
      translateX: animatedProgressValue.interpolate({
        inputRange: [0, 1],
        outputRange: [BAR_WIDTH / -2, 0],
      }),
    },
    {
      scaleX: animatedProgressValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.0001, 1],
      }),
    },
  ],
})

// TODO: CHANGE BUTTON STYLE ONCE 2 PRESS LIMIT PER DAY IS MET.
// const useConfirmedStyle = (theme, isConfirmed) =>
//   useMemo(() => {
//     const confirmedBackground = isConfirmed && { backgroundColor: theme.colors.success }

//     return { confirmedBackground }
//   }, [theme, isConfirmed])

const useAnimatedProgressValue = (intialValue = 1) => useRef(new Animated.Value(intialValue)).current

/**
 * ErrorCodeButton
 */

export const ErrorCodeButton = ({
  onPress,
  errorCode,
  onAnimationEnd,
  isDisabled,
  animationDuration,
  isLoading,
  isWaiting,
}) => {
  const animatedProgressValue = useAnimatedProgressValue()

  const startAnimation = useCallback(
    animatedValue => {
      animatedValue.setValue(0)

      Animated.timing(animatedValue, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.in(Easing.linear),
        useNativeDriver: true,
      }).start(({ finished }) => {
        onAnimationEnd(finished)
        animatedValue.setValue(1)
      })
    },
    [animationDuration, onAnimationEnd]
  )

  const progressBarStyles = useProgressBarStyles(animatedProgressValue)

  const handleResendButtonPress = useCallback(() => {
    onPress(errorCode)
  }, [onPress, errorCode])

  useEffect(() => {
    if (animationDuration === 0) {
      return
    }
    startAnimation(animatedProgressValue)
  }, [animationDuration, startAnimation, animatedProgressValue])

  const showAsDisabled = isDisabled && !isWaiting

  return (
    <StyledErrorCodeButton disabled={isDisabled} onPress={handleResendButtonPress}>
      {isLoading && !isWaiting ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          <StyledAnimation as={Animated.View} style={progressBarStyles} disabled={showAsDisabled} />
          <ButtonText>{errorCode}</ButtonText>
        </>
      )}
    </StyledErrorCodeButton>
  )
}

/*
 * PropTypes
 */

ErrorCodeButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  errorCode: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isWaiting: PropTypes.bool,
  onAnimationEnd: PropTypes.func.isRequired,
  animationDuration: PropTypes.number.isRequired,
}

ErrorCodeButton.defaultProps = {
  isDisabled: false,
  isLoading: false,
  isWaiting: false,
}

/*
 * Styles
 */

const StyledErrorCodeButton = styled(ThrottledTouchableOpacity)({
  borderRadius: 3,
  width: BAR_WIDTH,
  height: BAR_HEIGHT,
  margin: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: props => props.theme.lightSecondary,
})

const StyledAnimation = styled(View)({
  ...StyleSheet.absoluteFillObject,
  width: BAR_WIDTH,
  backgroundColor: props => (props.disabled ? props.theme.disabled : props.theme.secondary),
  borderRadius: 3,
})

const ButtonText = styled(Text)({
  fontFamily: Fonts.palanquin.bold,
  fontSize: 20,
  textAlign: 'center',
  color: Colors.LIGHT_BLUE_600,
})
