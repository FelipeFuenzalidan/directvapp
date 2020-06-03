import React from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'

/**
 * Constants
 */

const HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 }

/**
 * ThrottledTouchableOpacity
 */

export const ThrottledTouchableOpacity = props => {
  const { testID, onPress, throttleInterval } = props

  const handleOnPress = throttle(onPress, throttleInterval, {
    trailing: false,
  })

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TouchableOpacity {...props} hitSlop={HIT_SLOP} onPress={handleOnPress} testID={testID} />
}

/**
 * PropTypes
 */

ThrottledTouchableOpacity.propTypes = {
  ...TouchableOpacity.propTypes,
  throttleInterval: PropTypes.number,
  testID: PropTypes.string,
}

ThrottledTouchableOpacity.defaultProps = {
  ...TouchableOpacity.defaultProps,
  activeOpacity: 0.6,
  throttleInterval: 1500,
  onPress: () => {},
}
