import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { ThrottledTouchableOpacity } from './ThrottledTouchableOpacity'
import { Colors } from '~/theme/Colors'
import { Fonts } from '~/theme/Fonts'

/**
 * Round Button Component
 */

export const RoundButton = ({ onPress, text, disabled, buttonWidth, buttonColor, outline }) => {
  return (
    <StyledButton
      onPress={onPress}
      disabled={disabled}
      buttonWidth={buttonWidth}
      buttonColor={buttonColor}
      outline={outline}
    >
      <ButtonText disabled={disabled}>{text}</ButtonText>
    </StyledButton>
  )
}

/**
 * PropTypes
 */

RoundButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  buttonWidth: PropTypes.number,
  buttonColor: PropTypes.elementType,
  outline: PropTypes.bool,
}

RoundButton.defaultProps = {
  disabled: false,
  buttonWidth: 104,
  buttonColor: Colors.LIGHT_BLUE_500,
  outline: false,
}

/*
 * Styles
 */

const StyledButton = styled(ThrottledTouchableOpacity)({
  borderRadius: 5,
  width: props => (props.buttonWidth ? props.buttonWidth : 104),
  height: 32,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: props =>
    (props.disabled && Colors.PATTENTS_BLUE) || (props.outline && Colors.TRANSPARENT) || props.buttonColor,
  borderWidth: props => (props.outline && '2px') || '0px',
  borderColor: props => (props.outline && Colors.WHITE) || Colors.TRANSPARENT,
})

const ButtonText = styled(Text)({
  fontFamily: Fonts.dtvcurve.medium,
  fontSize: 16,
  textAlign: 'center',
  color: Colors.WHITE,
})
