import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import styled from 'styled-components/native'

import { Fonts } from '~/theme/Fonts'

const PlanDetailsScreen = () => {
  return (
    <SafeAreaView>
      <Title>Mi plan</Title>
    </SafeAreaView>
  )
}

/*
 * Styles
 */

const Title = styled(Text)({
  margin: 30,
  textAlign: 'center',
  fontFamily: Fonts.dtvcurve.medium,
  fontSize: 30,
  color: props => props.theme.primary,
})

export default PlanDetailsScreen
