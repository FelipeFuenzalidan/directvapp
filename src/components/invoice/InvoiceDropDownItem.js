import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Text, Image, View } from 'react-native'
import styled from 'styled-components/native'
import { values, isEmpty } from 'lodash'

import { Fonts } from '~/theme/Fonts'
import { Colors } from '~/theme/Colors'
import { ThrottledTouchableOpacity } from '../common/ThrottledTouchableOpacity'
import { InvoiceItemTypes } from '~/constants/InvoiceItemTypes'
import { InvoiceItem } from './InvoiceItem'
import { invoiceItemDetailsPropType } from '~/prop-types/invoice'
import { formatAmount } from '~/lib/utils'

/*
 * Constants
 */

const ColorByType = {
  [InvoiceItemTypes.BASIC]: Colors.LIGHT_BLUE_500,
  [InvoiceItemTypes.ADITIONALS]: Colors.PURPLE,
  [InvoiceItemTypes.PREMIUM]: Colors.AMBER,
  [InvoiceItemTypes.OTHERS]: Colors.LIGHT_BLUE_900,
}

/**
 * Invoice DropDown Item Component
 */

export const InvoiceDropDownItem = ({ description, paymentDue, itemType, itemDetails }) => {
  const [isOpen, setIsOpen] = useState(false)
  const color = ColorByType[itemType] || Colors.INDIGO

  const handleOpenPress = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <Container onPress={handleOpenPress}>
      <DropDownContainer>
        <TextsContainer>
          <StyledText color={color}>{description}</StyledText>
          <StyledText color={color}>{paymentDue}</StyledText>
        </TextsContainer>
        {isOpen && <Arrow color={color} source={require('~/images/caret-up.png')} />}
        {!isOpen && <Arrow color={color} source={require('~/images/caret-down.png')} />}
      </DropDownContainer>
      {isOpen &&
        !isEmpty(itemDetails) &&
        itemDetails.map((item, index) => {
          return (
            <InvoiceItem
              key={index} // eslint-disable-line react/no-array-index-key
              description={item.InvoiceLineText}
              paymentDue={`$${formatAmount(item?.BaseAmount?.amount)}`}
            />
          )
        })}
    </Container>
  )
}

/*
 * PropTypes
 */

InvoiceDropDownItem.propTypes = {
  description: PropTypes.string.isRequired,
  paymentDue: PropTypes.string.isRequired,
  itemType: PropTypes.oneOf(values(InvoiceItemTypes)),
  itemDetails: PropTypes.arrayOf(invoiceItemDetailsPropType),
}

InvoiceDropDownItem.defaultProps = {
  itemType: false,
  itemDetails: null,
}

/*
 * Styles
 */

const Container = styled(ThrottledTouchableOpacity)({
  width: '100%',
  marginVertical: 5,
})

const TextsContainer = styled(View)({
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
})

const DropDownContainer = styled(View)({
  flexDirection: 'row',
  width: '93%',
})

const StyledText = styled(Text)({
  fontFamily: Fonts.dtvcurve.medium,
  fontSize: 15,
  textTransform: 'uppercase',
  color: props => props.color,
})

const Arrow = styled(Image)({
  marginLeft: 5,
  width: 20,
  height: 20,
  tintColor: props => props.color,
})
