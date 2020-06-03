import React, { useState, useCallback } from 'react'
import { Text, View, Image } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Colors } from '~/theme/Colors'
import { Fonts } from '~/theme/Fonts'
import { ThrottledTouchableOpacity } from './ThrottledTouchableOpacity'
import { ImageSourcePropType } from '~/prop-types/common'

/**
 * Base Card Component
 */

export const Card = ({
  icon,
  iconColor,
  title,
  titleColor,
  children,
  backgroundColor,
  footer,
  footerAlignment,
  collapsible,
  arrowColor,
}) => {
  const [expanded, setExpanded] = useState(!collapsible)

  const handleButtonPress = useCallback(() => {
    setExpanded(!expanded)
  }, [expanded])

  const hasContent = footer || children

  return (
    <Container backgroundColor={backgroundColor}>
      <CollapsedContainer onPress={handleButtonPress} disabled={!collapsible || !hasContent}>
        <IconTitleContainer>
          {icon && <Icon source={icon} style={{ tintColor: iconColor }} />}
          <Title titleColor={titleColor}>{title}</Title>
        </IconTitleContainer>
        {collapsible && hasContent && (
          <Arrow
            arrowColor={arrowColor}
            source={expanded ? require('~/images/caret-up.png') : require('~/images/caret-down.png')}
          />
        )}
      </CollapsedContainer>
      {expanded && (
        <Content>
          {children}
          {footer && (
            <FooterContainer footerAlignment={footerAlignment}>
              <Line />
              {footer}
            </FooterContainer>
          )}
        </Content>
      )}
    </Container>
  )
}

/**
 * PropTypes
 */

Card.propTypes = {
  icon: ImageSourcePropType,
  iconColor: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.elementType,
  children: PropTypes.node,
  backgroundColor: PropTypes.elementType,
  footer: PropTypes.node,
  footerAlignment: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
  collapsible: PropTypes.bool,
  arrowColor: PropTypes.elementType,
}

Card.defaultProps = {
  titleColor: Colors.NERO,
  icon: null,
  iconColor: undefined,
  children: null,
  backgroundColor: Colors.WHITE,
  footer: null,
  footerAlignment: 'center',
  collapsible: false,
  arrowColor: Colors.LIGHT_BLUE_900,
}

/*
 * Styles
 */

const Container = styled(View)({
  paddingHorizontal: 20,
  paddingVertical: 20,
  borderRadius: 8,
  width: '100%',
  backgroundColor: props => props.backgroundColor,
  elevation: 3,
  shadowColor: Colors.NERO,
  shadowOpacity: 0.2,
  shadowRadius: 6,
  borderColor: 'transparent',
})

const CollapsedContainer = styled(ThrottledTouchableOpacity)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const Arrow = styled(Image)({
  tintColor: props => props.arrowColor,
})

const IconTitleContainer = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
})

const Icon = styled(Image)({
  width: 24,
  height: 24,
})

const Title = styled(Text)({
  color: props => props.titleColor,
  fontFamily: Fonts.dtvcurve.medium,
  fontSize: 20,
  paddingLeft: 16,
})

const FooterContainer = styled(View)({
  marginTop: 16,
  alignItems: props => props.footerAlignment,
})

const Line = styled(View)({
  width: '100%',
  height: 1,
  marginBottom: 16,
  backgroundColor: Colors.PATTENTS_BLUE,
})

const Content = styled(View)({
  marginTop: 10,
})
