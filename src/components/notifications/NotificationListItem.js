import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { parseISO, format } from 'date-fns'
import locale from 'date-fns/locale/es'

import { Fonts } from '~/theme/Fonts'
import { Colors } from '~/theme/Colors'

/**
 * Notification List Item Component
 */

export const NotificationListItem = ({ title, message, date, read }) => {
  const humanizedDate = format(parseISO(date), "dd 'de' MMMM", { locale })

  return (
    <Container read={read}>
      <LeftContainer>
        <Title read={read}>{title}</Title>
        <Message read={read} numberOfLines={1}>
          {message}
        </Message>
      </LeftContainer>
      <Date read={read}>{humanizedDate}</Date>
    </Container>
  )
}

/*
 * PropTypes
 */

NotificationListItem.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  read: PropTypes.bool,
}

NotificationListItem.defaultProps = {
  read: false,
}

/*
 * Styles
 */

const Container = styled(View)({
  padding: 20,
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: Colors.BLUE_GRAY,
  backgroundColor: props => (props.read ? Colors.BLUE_GRAY : Colors.WHITE),
})

const LeftContainer = styled(View)({
  flex: 1,
  paddingRight: 5,
})

const Title = styled(Text)({
  fontFamily: ({ read }) => (read ? Fonts.dtvcurve.regular : Fonts.dtvcurve.medium),
  color: Colors.NERO,
  fontSize: 16,
  marginBottom: 7,
})

const Message = styled(Text)({
  fontFamily: ({ read }) => (read ? Fonts.dtvcurve.regular : Fonts.dtvcurve.medium),
  color: Colors.GREY,
  fontSize: 14,
})

const Date = styled(Text)({
  fontFamily: Fonts.dtvcurve.regular,
  color: Colors.GREY,
  fontSize: 14,
})
