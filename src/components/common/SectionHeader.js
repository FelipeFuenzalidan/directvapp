import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'
import { Navigation } from 'react-native-navigation'

import { Colors } from '~/theme/Colors'
import { Fonts } from '~/theme/Fonts'
import { ScreenIds } from '~/navigation'
import { useNotifications } from '~/hooks/notifications'

/**
 * Section Header Component
 */

export const SectionHeader = ({ title, iconSource }) => {
  const { unreadCount } = useNotifications()

  const handleNotificationIconPress = useCallback(() => {
    Navigation.showModal({
      component: {
        name: ScreenIds.NOTIFICATIONS,
        options: {
          modalPresentationStyle: 'fullScreen',
        },
      },
    })
  }, [])

  return (
    <Container>
      <InnerHeaderContainer>
        <Icon source={iconSource} />
        <Title>{title}</Title>
      </InnerHeaderContainer>
      <TouchableOpacity onPress={handleNotificationIconPress}>
        <NotificationIcon source={require('~/images/notification-bell.png')} />
        {unreadCount > 0 && <Badge />}
      </TouchableOpacity>
    </Container>
  )
}

/*
 * PropTypes
 */

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  iconSource: PropTypes.node.isRequired,
}

/*
 * Styles
 */

const Container = styled(View)({
  height: 56 + getStatusBarHeight(),
  width: '100%',
  paddingHorizontal: 16,
  paddingTop: getStatusBarHeight(),
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: Colors.BLUE_GRAY,
})

const InnerHeaderContainer = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
})

const Icon = styled(Image)({
  width: 24,
  height: 24,
  tintColor: Colors.LIGHT_BLUE_900,
})

const BADGE_SIZE = 11

const Badge = styled(View)({
  width: BADGE_SIZE,
  height: BADGE_SIZE,
  borderRadius: BADGE_SIZE / 2,
  backgroundColor: Colors.RED,
  position: 'absolute',
  right: 0,
  top: 4,
})

const Title = styled(Text)({
  paddingLeft: 21,
  color: Colors.LIGHT_BLUE_900,
  fontFamily: Fonts.dtvcurve.medium,
  fontSize: 20,
})

const NotificationIcon = styled(Image)({
  width: 24,
  height: 24,
  tintColor: Colors.INDIGO,
})
