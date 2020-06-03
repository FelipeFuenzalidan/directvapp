import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { ThrottledTouchableOpacity } from './ThrottledTouchableOpacity'
import { Colors } from '~/theme/Colors'
import { Fonts } from '~/theme/Fonts'

/**
 * Link Button Component
 */

export const LinkButton = ({ onPress, text }) => {
  return (
    <ThrottledTouchableOpacity onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </ThrottledTouchableOpacity>
  )
}

/**
 * PropTypes
 */

LinkButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

/*
 * Styles
 */

const ButtonText = styled(Text)({
  fontFamily: Fonts.dtvcurve.regular,
  fontSize: 15,
  textAlign: 'center',
  color: Colors.LIGHT_BLUE_500,
})
