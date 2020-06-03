import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, Text, Image, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { Navigation } from 'react-native-navigation'
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks'

import { Fonts } from '~/theme/Fonts'
import { NotificationList } from '~/components/notifications/NotificationList'
import { useNotifications } from '~/hooks/notifications'
import { Colors } from '~/theme/Colors'

function NotificationsScreen({ componentId }) {
  const { t } = useTranslation('notifications')
  const { notifications, fetching, refetch, refetching, markAllAsRead } = useNotifications()

  const handleClosePress = useCallback(() => Navigation.dismissModal(componentId), [componentId])

  const handlePullToRefresh = useCallback(() => {
    markAllAsRead()
    refetch()
  }, [markAllAsRead, refetch])

  useNavigationComponentDidAppear(() => {
    markAllAsRead()
  }, componentId)

  return (
    <Container>
      <Header>
        <Title>{t('title')}</Title>
        <TouchableOpacity onPress={handleClosePress}>
          <Icon source={require('~/images/cruz.png')} />
        </TouchableOpacity>
      </Header>
      {fetching && !refetching ? (
        <Spinner color="blue" />
      ) : (
        <NotificationList notifications={notifications} refreshing={refetching} onPullToRefresh={handlePullToRefresh} />
      )}
    </Container>
  )
}

NotificationsScreen.propTypes = {
  componentId: PropTypes.string.isRequired,
}

/*
 * Styles
 */

const Container = styled(SafeAreaView)({
  flex: 1,
})

const Spinner = styled.ActivityIndicator.attrs({
  size: 'large',
  color: Colors.INDIGO,
})({
  marginTop: 20,
})

const Header = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginHorizontal: 20,
})

const Icon = styled(Image)({
  width: 24,
  height: 24,
  tintColor: Colors.LIGHT_BLUE_900,
})

const Title = styled(Text)({
  marginTop: 20,
  marginBottom: 20,
  fontFamily: Fonts.dtvcurve.medium,
  fontSize: 24,
  color: Colors.LIGHT_BLUE_900,
})

export default NotificationsScreen
