import React, { useState, useCallback } from 'react'
import { View, Image } from 'react-native'
import { withFormik, Field } from 'formik'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components/native'

import { loginFormSchema } from '~/validations/user'
import { FormikTextField } from '~/components/common/FormikField'
import { ThrottledTouchableOpacity } from './common/ThrottledTouchableOpacity'
import { Button } from './common/Button'

/**
 * Connect with Formik
 */

const withLoginForm = withFormik({
  validationSchema: loginFormSchema,
  handleSubmit: async (values, { props: { onSubmit } }) => {
    await onSubmit(values)
  },
  isInitialValid: false,
})

export const LoginForm = withLoginForm(props => {
  const { t } = useTranslation('login')
  const { values, isValid, onSubmit, loading, loginButtonText } = props
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleSubmitButton = useCallback(() => {
    if (isValid) {
      onSubmit(values.username, values.password)
    }
  }, [isValid, onSubmit, values])

  const handleVisiblePasswordPress = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible)
  }, [isPasswordVisible])

  const handleSubmitButtonPress = useCallback(() => {
    if (isValid) {
      handleSubmitButton()
    }
  }, [isValid, handleSubmitButton])

  return (
    <Container>
      <FormContainer>
        <Field
          testID="login-username-field"
          component={FormikTextField}
          name="username"
          placeholder={t('placeholders.email')}
          onSubmitEditing={handleSubmitButtonPress}
        />
        <PasswordFieldContainer>
          <Field
            testID="login-password-field"
            component={FormikTextField}
            name="password"
            placeholder={t('placeholders.password')}
            textContentType="password"
            secureTextEntry={!isPasswordVisible}
            onSubmitEditing={handleSubmitButtonPress}
          />
          <ToggleVisibleButton testID="login-visible-password-button" onPress={handleVisiblePasswordPress}>
            <Image source={isPasswordVisible ? require('~/images/visible.png') : require('~/images/invisible.png')} />
          </ToggleVisibleButton>
        </PasswordFieldContainer>
      </FormContainer>

      <Button
        testID="login-submit-button"
        onPress={handleSubmitButton}
        disabled={!isValid || loading}
        text={loginButtonText}
        loading={loading}
      />
    </Container>
  )
})

/**
 * PropTypes
 */

LoginForm.propTypes = {
  isValid: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  loginButtonText: PropTypes.string.isRequired,
}

LoginForm.defaultProps = {
  onSubmit: () => {},
}

/*
 * Styles
 */

const Container = styled(View)({
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
})

const FormContainer = styled(View)({
  width: '100%',
  marginBottom: 40,
})

const PasswordFieldContainer = styled(View)({
  marginTop: 25,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
})

const ToggleVisibleButton = styled(ThrottledTouchableOpacity)({
  position: 'absolute',
  right: 19,
  paddingBottom: 10,
})
