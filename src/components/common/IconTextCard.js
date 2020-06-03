import React from 'react'
import { Text, View, Image } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Colors } from '~/theme/Colors'
import { Fonts } from '~/theme/Fonts'
import { ImageSourcePropType } from '~/prop-types/common'

export const IconTextCard = ({ iconSource, text, backgroundColor, iconColor, textColor }) => {
  return (
    <Container backgroundColor={backgroundColor}>
      {iconSource && <Icon source={iconSource} iconColor={iconColor} />}
      <ContentText textColor={textColor}>{text}</ContentText>
    </Container>
  )
}

/*
 * PropTypes
 */

IconTextCard.propTypes = {
  iconSource: ImageSourcePropType,
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.elementType,
  iconColor: PropTypes.elementType,
  textColor: PropTypes.elementType,
}

IconTextCard.defaultProps = {
  iconSource: null,
  backgroundColor: Colors.WHITE,
  iconColor: Colors.WHITE,
  textColor: Colors.NERO,
}

/*
 * Styles
 */

const Container = styled(View)({
  backgroundColor: props => props.backgroundColor,
  borderRadius: 8,
  elevation: 3,
  shadowColor: Colors.NERO,
  shadowOpacity: 0.2,
  shadowRadius: 6,
  borderColor: 'transparent',
  paddingVertical: 20,
  paddingHorizontal: 15,
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
})

const Icon = styled(Image)({
  tintColor: props => props.iconColor,
})

const ContentText = styled(Text)({
  marginLeft: 20,
  fontFamily: Fonts.dtvcurve.regular,
  color: props => props.textColor,
  fontSize: 16,
})
