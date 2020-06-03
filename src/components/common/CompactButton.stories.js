import React from 'react'
import { View } from 'react-native'
import { withKnobs } from '@storybook/addon-knobs'
import styled from 'styled-components/native'

import { storiesOf } from '@storybook/react-native'

import { CompactButton } from './CompactButton'
import { Colors } from '~/theme/Colors'

storiesOf('CompactButton', module)
  .addDecorator(withKnobs)
  .add('Ver facturas', () => (
    <TransparentWrapper>
      <CompactButton text="Ver facturas anteriores" onPress={() => {}} iconSource={require('~/images/invoice.png')} />
    </TransparentWrapper>
  ))
  .add('Quejas', () => (
    <TransparentWrapper>
      <CompactButton
        text="Tengo una duda con mi factura"
        onPress={() => {}}
        iconSource={require('~/images/whatsapp.png')}
      />
    </TransparentWrapper>
  ))
  .add('Compartir Transparente', () => (
    <TransparentWrapper>
      <CompactButton
        text="Descargar o compartir la factura"
        onPress={() => {}}
        iconSource={require('~/images/share.png')}
        outline
      />
    </TransparentWrapper>
  ))

/*
 * Styles
 */

// ADDED BACKGROUND TO SHOW TRANSPARENT BUTTON PROPERLY

const TransparentWrapper = styled(View)({
  backgroundColor: Colors.ALT_GREY,
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  paddingHorizontal: 40,
})
