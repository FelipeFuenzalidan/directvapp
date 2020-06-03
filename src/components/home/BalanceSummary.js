import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

import { Fonts } from '~/theme/Fonts'
import { Colors } from '~/theme/Colors'
import { RoundButton } from '~/components/common/RoundButton'

/**
 * Balance Summary Component
 */

export const BalanceSummary = ({ balance, onRechargePress }) => {
  return (
    <Container>
      <LeftContainer>
        <Title>Tu saldo</Title>
        <Balance>${balance}</Balance>
      </LeftContainer>

      <RoundButton text="Recargar" onPress={onRechargePress} />
    </Container>
  )
}

/*
 * PropTypes
 */

BalanceSummary.propTypes = {
  balance: PropTypes.number.isRequired,
  onRechargePress: PropTypes.func,
}

BalanceSummary.defaultProps = {
  onRechargePress: () => {},
}

/*
 * Styles
 */

const Container = styled(View)({
  padding: 20,
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const LeftContainer = styled(View)({
  flex: 1,
})

const Title = styled(Text)({
  fontFamily: Fonts.dtvcurve.bold,
  color: Colors.BLACK,
  fontSize: 15,
})

const Balance = styled(Text)({
  fontFamily: Fonts.dtvcurve.regular,
  fontSize: 26,
  color: props => (props.disabled ? Colors.GREY : Colors.BLACK),
  textTransform: 'uppercase',
  marginRight: 10,
  marginTop: 5,
})
