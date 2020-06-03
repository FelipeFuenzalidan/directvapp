import React from 'react'
import PropTypes from 'prop-types'
import { Animated, Platform, Text, View } from 'react-native'
import styled from 'styled-components/native'

import { Fonts } from '~/theme/Fonts'
import { Colors } from '~/theme/Colors'
import { useAnimatedToast } from '~/hooks/animations'

/*
 * Constants
 */

const TOAST_HEIGHT = Platform.OS === 'ios' ? 110 : 66

/**
 * ErrorToast Component
 */

export const ErrorToast = ({ testID, errorText, hasError }) => {
  const toastAnimatedStyle = useAnimatedToast(hasError, TOAST_HEIGHT)

  return (
    <AnimatedContainer testID={testID} as={Animated.View} style={toastAnimatedStyle}>
      <ErrorToastText>{errorText}</ErrorToastText>
    </AnimatedContainer>
  )
}

/*
 * PropTypes
 */

ErrorToast.propTypes = {
  testID: PropTypes.string,
  errorText: PropTypes.string.isRequired,
  hasError: PropTypes.bool,
}

ErrorToast.defaultProps = {
  testID: undefined,
  hasError: false,
}

/*
 * Styles
 */

const AnimatedContainer = styled(View)({
  zIndex: 999,
  elevation: 5,
  position: 'absolute',
  top: 0,
  width: '100%',
  height: TOAST_HEIGHT,
  backgroundColor: Colors.CRIMSON,
  justifyContent: 'center',
})

const ErrorToastText = styled(Text)({
  paddingTop: Platform.OS === 'ios' ? 30 : 0,
  fontFamily: Fonts.dtvcurve.regular,
  fontSize: 16,
  textAlign: 'center',
  color: Colors.WHITE,
})
