import React, { useCallback, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import styled from 'styled-components/native'
import { Fonts } from '~/theme/Fonts'
import { Colors } from '~/theme/Colors'

/**
 * Custom text input component
 */
export const TextField = ({
  testID,
  value,
  name,
  placeholder,
  label,
  onChange,
  onBlur,
  onFocus,
  error,
  keyboardType,
  maxLength,
  textContentType,
  secureTextEntry,
  onSubmitEditing,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const handleChange = useCallback(
    text => {
      const updatedValue = keyboardType === 'numeric' ? parseInt(text, 10) : text
      onChange(name, updatedValue)
    },
    [keyboardType, onChange, name]
  )
  const handleFocus = useCallback(() => {
    onFocus(name)
    setIsFocused(true)
  }, [name, onFocus])

  const handleBlur = useCallback(() => {
    onBlur(name)
    setIsFocused(false)
  }, [name, onBlur])

  const inputValue = value && value.toString()

  const handleEndEditing = useCallback(() => {
    setIsFocused(false)
  }, [])

  return (
    <Container>
      {!isEmpty(label) && <Label>{label}</Label>}
      <StyledTextInput
        testID={testID}
        placeholder={placeholder}
        placeholderTextColor={isFocused ? Colors.INDIGO : Colors.PATTENTS_BLUE}
        onChangeText={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onEndEditing={handleEndEditing}
        keyboardType={keyboardType}
        maxLength={maxLength}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
        value={inputValue}
        textAlignVertical="center"
        error={!isEmpty(error)}
        isFocused={isFocused}
        onSubmitEditing={onSubmitEditing}
      />
    </Container>
  )
}

/*
 * PropTypes
 */
TextField.propTypes = {
  testID: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  keyboardType: TextInput.propTypes.keyboardType,
  maxLength: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textContentType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
}
TextField.defaultProps = {
  testID: undefined,
  label: null,
  keyboardType: 'default',
  error: false,
  maxLength: 9999,
  value: null,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  textContentType: null,
  secureTextEntry: false,
  onSubmitEditing: () => {},
}

/*
 * Styles
 */
const Container = styled(View)({
  marginBottom: 10,
})

const Label = styled(Text)({
  fontFamily: Fonts.dtvcurve.regular,
  color: Colors.PATTENTS_BLUE,
  fontSize: 16,
})

const StyledTextInput = styled(TextInput)({
  backgroundColor: props => (props.isFocused ? Colors.WHITE : Colors.LIGHT_BLUE_900),
  width: '100%',
  fontSize: 15,
  fontFamily: Fonts.dtvcurve.medium,
  paddingHorizontal: 16,
  paddingRight: props => (props.textContentType === 'password' ? 40 : 16),
  height: 48,
  borderRadius: 4,
  alignItems: 'center',
  paddingBottom: 12,
  paddingTop: 12,
  borderColor: ({ error }) => (error ? '#d10d39' : 'transparent'),
  borderWidth: 2,
  color: props => (props.isFocused ? Colors.INDIGO : Colors.PATTENTS_BLUE),
})
