import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'

import { startLoginFlow } from '~/navigation'
import { Fonts } from '~/theme/Fonts'
import { logout } from '~/api/auth'
import { Button } from '~/components/common/Button'

const ProfileScreen = () => {
  const { t } = useTranslation('profile')

  const handleLogoutPress = async () => {
    await logout()
    startLoginFlow(true)
  }

  return (
    <Container>
      <Title>{t('title')}</Title>
      <Content>
        <Button testID="logout-button" text={t('logout')} onPress={handleLogoutPress} />
      </Content>
    </Container>
  )
}

/*
 * Styles
 */

const Container = styled(SafeAreaView)({
  flex: 1,
})

const Content = styled(SafeAreaView)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})

const Title = styled(Text)({
  margin: 30,
  textAlign: 'center',
  fontFamily: Fonts.dtvcurve.medium,
  fontSize: 30,
  color: props => props.theme.primary,
})

export default ProfileScreen
