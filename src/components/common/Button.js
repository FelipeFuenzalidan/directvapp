import React from 'react'
import { Text, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { ThrottledTouchableOpacity } from './ThrottledTouchableOpacity'
import { Colors } from '~/theme/Colors'
import { Fonts } from '~/theme/Fonts'

/**
 * Base Button Component
 */

export const Button = ({ testID, onPress, text, outline, disabled, loading, backgroundColor, compact }) => {
  return (
    <StyledButton
      testID={testID}
      outline={outline}
      onPress={onPress}
      disabled={disabled}
      backgroundColor={backgroundColor}
      compact={compact}
    >
      {!loading && <ButtonText disabled={disabled}>{text}</ButtonText>}
      {loading && <ActivityIndicator />}
    </StyledButton>
  )
}

/**
 * PropTypes
 */

Button.propTypes = {
  testID: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  outline: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  backgroundColor: PropTypes.elementType,
  compact: PropTypes.bool,
}

Button.defaultProps = {
  testID: undefined,
  outline: false,
  disabled: false,
  loading: false,
  backgroundColor: Colors.LIGHT_BLUE_900,
  compact: false,
}

/*
 * Styles
 */

const StyledButton = styled(ThrottledTouchableOpacity)({
  borderRadius: 5,
  width: '100%',
  height: props => (props.compact ? '32px' : '48px'),
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: props =>
    (props.disabled && props.theme.lightSecondary) || (props.outline && Colors.TRANSPARENT) || props.backgroundColor,
  borderWidth: props => (props.outline ? '2px' : '0px'),
  borderColor: props => (props.outline ? Colors.WHITE : Colors.RED),
})

const ButtonText = styled(Text)({
  fontFamily: Fonts.dtvcurve.medium,
  textTransform: 'uppercase',
  fontSize: 16,
  textAlign: 'center',
  color: props => (props.disabled && props.theme.disabledWhiteText) || props.theme.whiteText,
})
