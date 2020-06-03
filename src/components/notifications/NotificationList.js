import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { FlatList, RefreshControl } from 'react-native'

import { NotificationListItem } from './NotificationListItem'
import { notificationPropTypes } from '~/prop-types/notifications'
import { Colors } from '~/theme/Colors'

/**
 * Notification List Component
 */

export const NotificationList = ({ notifications, refreshing, onPullToRefresh }) => {
  const renderItem = useCallback(({ item: { title, body, status, createdOn } }) => {
    return <NotificationListItem title={title} message={body} date={createdOn} read={status === 'READ'} />
  }, [])

  const keyExtractor = useCallback(item => item.id, [])

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshControl={
        <RefreshControl enabled tintColor={Colors.LIGHT_BLUE_900} refreshing={refreshing} onRefresh={onPullToRefresh} />
      }
    />
  )
}

/*
 * PropTypes
 */

NotificationList.propTypes = {
  notifications: PropTypes.arrayOf(notificationPropTypes).isRequired,
  refreshing: PropTypes.bool,
  onPullToRefresh: PropTypes.func.isRequired,
}

NotificationList.defaultProps = {
  refreshing: false,
}
