import { useEffect, useState } from 'react'
import { AppState } from 'react-native'

export function useAppState({ onChange, onForeground, onBackground } = {}) {
  const [appState, setAppState] = useState(AppState.currentState)

  useEffect(() => {
    function handleAppStateChange(nextAppState) {
      setAppState(nextAppState)
      if (nextAppState === 'active') {
        if (typeof onForeground === 'function') {
          onForeground()
        }
      } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
        if (typeof onBackground === 'function') {
          onBackground()
        }
      }
      if (typeof onChange === 'function') {
        onChange()
      }
    }

    AppState.addEventListener('change', handleAppStateChange)

    return () => AppState.removeEventListener('change', handleAppStateChange)
  }, [onChange, onForeground, onBackground, appState])

  return { appState }
}
