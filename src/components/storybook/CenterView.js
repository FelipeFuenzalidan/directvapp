/* eslint-disable react-native/no-color-literals */
import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

export function CenterView({ children }) {
  return <View style={styles.container}>{children}</View>
}

CenterView.defaultProps = {
  children: null,
}

CenterView.propTypes = {
  children: PropTypes.node,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
