import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import styled from 'styled-components/native'

import { Colors } from '~/theme/Colors'
import { Fonts } from '~/theme/Fonts'
import { ThrottledTouchableOpacity } from '~/components/common/ThrottledTouchableOpacity'
import { Button } from '../common/Button'

export const CodeButton = ({ codeNumber, codeTitle, codeButtonText, codeDescriptions, onPress }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleExpandPress = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const handleButtonPress = useCallback(() => onPress(codeNumber), [onPress, codeNumber])

  return (
    <Container>
      <CompressedContainer>
        <ContentContainer>
          <CodeNumber>{codeNumber}</CodeNumber>
          <CodeTitle>{codeTitle}</CodeTitle>
        </ContentContainer>
        <ButtonContainer>
          <Separator />
          <ExpandButton onPress={handleExpandPress}>
            {isOpen && <Arrow source={require('~/images/caret-up.png')} />}
            {!isOpen && <Arrow source={require('~/images/caret-down.png')} />}
          </ExpandButton>
        </ButtonContainer>
      </CompressedContainer>
      {isOpen && (
        <ExpandedContainer>
          <CodeDescriptionsContainer>
            {codeDescriptions.map(description => {
              return <CodeDescription key={codeDescriptions[description]}>{`- ${description}`}</CodeDescription>
            })}
          </CodeDescriptionsContainer>
          <Button text={codeButtonText} onPress={handleButtonPress} backgroundColor={Colors.LIGHT_BLUE_900} compact />
        </ExpandedContainer>
      )}
    </Container>
  )
}

/*
 * PropTypes
 */

CodeButton.propTypes = {
  codeNumber: PropTypes.number.isRequired,
  codeTitle: PropTypes.string.isRequired,
  codeDescriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  codeButtonText: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

/*
 * Styles
 */

const Container = styled(View)({
  marginVertical: 8,
})

const CompressedContainer = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderRadius: 4,
  borderWidth: 1,
  borderColor: Colors.LIGHT_BLUE_900,
})

const ContentContainer = styled(View)({
  flexDirection: 'row',
  padding: 12,
})

const CodeNumber = styled(Text)({
  fontFamily: Fonts.palanquin.semiBold,
  fontSize: 16,
  color: Colors.LIGHT_BLUE_900,
})

const CodeTitle = styled(Text)({
  fontFamily: Fonts.palanquin.regular,
  fontSize: 16,
  color: Colors.LIGHT_BLUE_900,
  marginLeft: 8,
})

const ButtonContainer = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
})

const Separator = styled(View)({
  width: 1,
  height: '100%',
  backgroundColor: Colors.LIGHT_BLUE_900,
})

const ExpandButton = styled(ThrottledTouchableOpacity)({
  tintColor: Colors.LIGHT_BLUE_900,
  margin: 15,
})

const Arrow = styled(Image)({
  tintColor: Colors.LIGHT_BLUE_900,
  width: 18,
  height: 18,
})

const ExpandedContainer = styled(View)({
  padding: 16,
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  borderTopWidth: 0,
  borderBottomWidth: 1,
  borderRightWidth: 1,
  borderLeftWidth: 1,
  borderColor: Colors.LIGHT_BLUE_900,
})

const CodeDescriptionsContainer = styled(View)({
  marginBottom: 8,
})

const CodeDescription = styled(Text)({
  color: Colors.NERO,
  fontFamily: Fonts.palanquin.medium,
  fontSize: 14,
})
