import React from 'react'
import { Text, Image, View } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { ThrottledTouchableOpacity } from './ThrottledTouchableOpacity'
import { Colors } from '~/theme/Colors'
import { Fonts } from '~/theme/Fonts'
import { ImageSourcePropType } from '~/prop-types/common'

/**
 * Compact Button Component
 */

export const CompactButton = ({ onPress, text, outline, disabled, iconSource }) => {
  return (
    <StyledButton outline={outline} onPress={onPress} disabled={disabled}>
      <IconTextContainer>
        {iconSource && <Icon outline={outline} source={iconSource} />}
        <ButtonText outline={outline}>{text}</ButtonText>
      </IconTextContainer>
      <Arrow outline={outline} source={require('~/images/caret-right.png')} />
    </StyledButton>
  )
}

/**
 * PropTypes
 */

CompactButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  outline: PropTypes.bool,
  disabled: PropTypes.bool,
  iconSource: ImageSourcePropType,
}

CompactButton.defaultProps = {
  outline: false,
  disabled: false,
  iconSource: null,
}

/*
 * Styles
 */

const StyledButton = styled(ThrottledTouchableOpacity)({
  borderRadius: 5,
  width: '100%',
  height: 48,
  paddingHorizontal: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: props => (props.outline && Colors.TRANSPARENT) || Colors.WHITE,
  borderWidth: props => (props.outline && '2px') || 0,
  borderColor: props => (props.outline && Colors.LIGHT_BLUE_900) || Colors.TRANSPARENT,
})

const IconTextContainer = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
})

const ButtonText = styled(Text)({
  padding: 10,
  fontFamily: Fonts.dtvcurve.regular,
  fontSize: 14,
  textAlign: 'center',
  color: props => (props.outline && Colors.LIGHT_BLUE_900) || Colors.LIGHT_BLUE_500,
})

const Icon = styled(Image)({
  width: 23,
  height: 23,
  tintColor: props => (props.outline && Colors.LIGHT_BLUE_900) || Colors.LIGHT_BLUE_500,
})

const Arrow = styled(Image)({
  width: 6,
  height: 10,
  tintColor: props => (props.outline && Colors.LIGHT_BLUE_900) || Colors.LIGHT_BLUE_500,
})
