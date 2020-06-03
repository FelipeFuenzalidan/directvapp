import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import { SafeAreaView, Alert, ActivityIndicator, Text, View } from 'react-native'
import styled, { ThemeProvider } from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { capitalize } from 'lodash'

import { LoginForm } from '~/components/LoginForm'
import { Logo } from '~/components/common/Logo'
import { Button } from '~/components/common/Button'
import { LinkButton } from '~/components/common/LinkButton'
import { ErrorToast } from '~/components/common/ErrorToast'
import { themes } from '~/theme/theme'
import { login } from '~/api/auth'
import { useLoggedUser } from '~/hooks/auth'
import { Fonts } from '~/theme/Fonts'
import { Colors } from '~/theme/Colors'
import { startLoggedInFlow } from '~/navigation'
import { WINDOW_WIDTH } from '~/styles/helpers'

const ErrorType = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  SERVER_ERROR: 'SERVER_ERROR',
}

const LoginScreen = ({ forceLogin }) => {
  const [loading, setLoading] = useState(false)
  const [idToken, setIDToken] = useState(false)
  const [errorType, setErrorType] = useState(false)
  const { t } = useTranslation('login')
  const { isLogged, fetching: fetchingLoggedUser, refetch, isPrePaid } = useLoggedUser()

  useEffect(() => {
    if (isLogged && !forceLogin) {
      navigateToHomeScreen(isPrePaid)
    }
  }, [isLogged, forceLogin, isPrePaid])

  const fetchUserInfo = useCallback(async () => {
    try {
      const loggedUser = await refetch()
      navigateToHomeScreen(loggedUser.isPrePaid)
    } catch (err) {
      setErrorType(ErrorType.SERVER_ERROR)
    }
  }, [refetch])

  const handleLoginFormSubmit = useCallback(
    async (username, password) => {
      try {
        setErrorType(null)
        setLoading(true)
        const token = await login(username, password)
        setIDToken(token)
        await fetchUserInfo()
      } catch (err) {
        setErrorType(ErrorType.INVALID_CREDENTIALS)
      } finally {
        setLoading(false)
      }
    },
    [fetchUserInfo]
  )

  const handleRegistrationPress = useCallback(() => {
    Alert.alert('TODO: Registration')
  }, [])

  const handleForgotPasswordPress = useCallback(() => {
    Alert.alert('Hacé memoria... ¡ya te vas a acordar!')
  }, [])

  return (
    <ThemeProvider theme={themes.post}>
      <ErrorToast testID="login-error-toast" errorText={errorType && t(`errors.${errorType}`)} hasError={errorType} />
      <Container testID="login-screen">
        <Spacer />
        <Logo />
        <Spacer />

        {fetchingLoggedUser ? (
          <>
            {idToken && <LoginText>Hola {capitalize(idToken?.givenName)}</LoginText>}
            <ButtonSpacer />
            <ActivityIndicator size="large" />
            <ButtonSpacer />
          </>
        ) : (
          <>
            <LoginText>{t('login')}</LoginText>
            <LoginForm onSubmit={handleLoginFormSubmit} loading={loading} loginButtonText={t('submitButton')} />
            <Button onPress={handleRegistrationPress} text={t('registrationButton')} outline />
            <ButtonSpacer />
            <LinkButton onPress={handleForgotPasswordPress} text={t('forgotPassword')} />
          </>
        )}
      </Container>
    </ThemeProvider>
  )
}

LoginScreen.propTypes = {
  forceLogin: PropTypes.bool,
}

LoginScreen.defaultProps = {
  forceLogin: false,
}

/**
 * Helpers
 */

function navigateToHomeScreen(isPrePaid) {
  startLoggedInFlow(isPrePaid)
}

/**
 * Styles
 */

const Container = styled(View)({
  flex: 1,
  width: WINDOW_WIDTH,
  paddingHorizontal: 24,
  alignItems: 'center',
  backgroundColor: Colors.INDIGO,
})

const Spacer = styled(SafeAreaView)({
  minHeight: 70,
})

const ButtonSpacer = styled(SafeAreaView)({
  minHeight: 36,
})

const LoginText = styled(Text)({
  marginTop: 36,
  marginBottom: 24,
  textAlign: 'center',
  fontFamily: Fonts.dtvcurve.medium,
  fontSize: 20,
  textTransform: 'uppercase',
  color: Colors.WHITE,
})

/**
 * Screen options
 */

LoginScreen.options = {
  statusBar: {
    style: 'light',
  },
}

export default LoginScreen
