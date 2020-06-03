import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { format, parseISO } from 'date-fns'
import { isEmpty } from 'lodash'

import { Fonts } from '~/theme/Fonts'
import { Colors } from '~/theme/Colors'
import { productOfferPropType } from '~/prop-types/invoice'

/**
 * Invoice Offers Details Component
 */

export const InvoiceOffers = ({ productOffers }) => {
  const { t } = useTranslation('invoice')

  return (
    <Container>
      <Title>{t('subtitles.expiration')}</Title>
      {!isEmpty(productOffers) &&
        productOffers.map(item => {
          return (
            <OfferItemContainer key={`${item.name}|${item.endDateTime}`}>
              <OfferItemText>{item.name}</OfferItemText>
              {item.endDateTime && <OfferItemText>{format(parseISO(item.endDateTime), 'dd/MM/yyyy')}</OfferItemText>}
            </OfferItemContainer>
          )
        })}
    </Container>
  )
}

/*
 * PropTypes
 */

InvoiceOffers.propTypes = {
  productOffers: PropTypes.arrayOf(productOfferPropType).isRequired,
}

/*
 * Styles
 */

const Container = styled(View)({
  backgroundColor: Colors.BLUE_GRAY,
  padding: 20,
})

const Title = styled(Text)({
  fontFamily: Fonts.dtvcurve.medium,
  color: Colors.BLACK,
  fontSize: 20,
  paddingBottom: 10,
})

const OfferItemContainer = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 8,
})

const OfferItemText = styled(Text)({
  fontFamily: Fonts.dtvcurve.regular,
  color: Colors.BLACK,
  fontSize: 15,
})
