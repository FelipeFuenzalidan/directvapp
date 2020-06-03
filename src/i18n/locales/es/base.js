/* eslint-disable padding-line-between-statements */
/* eslint-disable import/no-default-export */
import { isEmpty } from 'lodash'
import { isToday, parseISO, format } from 'date-fns'
import locale from 'date-fns/locale/es'

export default {
  buttons: {
    back: 'Volver a Home',
  },
  home: {
    whatFor: 'Llamar ¿para qué?',
    chuckNorrisFact: 'Did you know...',
    switchThemeButton: 'Cambiar tema',
    whatsAppButton: 'Enviar WhatsApp',
    selfCare: 'Self Care',
    welcome: ({ name }) => `¡Hola ${name}!`,
    errorCodeButton: 'Código en pantalla',
    seePromotionsButton: 'Ver promos',
    workOrder: {
      title: 'Visita técnica agendada',
      description: ({ requestDate, timeSlot }) => {
        const date = parseISO(requestDate)
        const fromHours = timeSlot && timeSlot.startDateTime && format(parseISO(timeSlot.startDateTime), 'HH:mm')
        const toHours = timeSlot && timeSlot.endDateTime && format(parseISO(timeSlot.endDateTime), 'HH:mm')

        let timeSlotText = isEmpty(timeSlot)
          ? ''
          : `LLegará al domicilio entre las ${fromHours} y las ${toHours} horas.\n`

        if (isToday(date)) {
          return `El técnico que solicitaste ya está en camino. \n${timeSlotText}\nPodés cancelar la visita desde la web de DIRECTV`
        }

        const visitDate = format(date, "dd 'de' MMMM", { locale })
        timeSlotText = isEmpty(timeSlot) ? '' : ` entre las ${fromHours} y las ${toHours} horas`

        return `El técnico te visitará el día ${visitDate}${timeSlotText}`
      },
    },
  },
  login: {
    instructions: 'Usa tu email/password',
    login: 'Iniciar Sesión',
    submitButton: 'Ingresar',
    backButton: 'Volver atrás',
    registrationButton: 'Registrarme',
    forgotPassword: 'Olvidé mi contraseña',
    errors: {
      INVALID_CREDENTIALS: 'Tu email o contraseña son incorrectas',
      SERVER_ERROR: 'Tenemos algunos problemas\nVolvé a intentarlo en un rato',
    },
    placeholders: {
      email: 'E-mail',
      password: 'Contraseña',
    },
  },
  errorExtensions: {
    instructions: 'Seleccioná el código de error que ves en tu televisor',
    limitReached: 'Ya superaste la cantidad de comandos permitidos por día',
    _721: '721',
    _722: '722',
    _711: '711',
    backButton: 'Volver atrás',
    sendingCommand: ({ command }) => `Enviando comando ${command}`,
    limitReachedErrorModal: {
      title: 'No pudimos enviar el comando',
      subtitle: 'Ya alcanzaste el máximo intentos diarios',
    },
    unexpectedErrorSendingCommand: 'Ocurrió un error y no pudimos enviar el comando',
    commandSentModal: {
      title: 'Comando enviado',
      subtitle: '¿El problema fue solucionado?',
      buttons: {
        yes: 'Si',
        no: 'No',
      },
    },
    commandBeingSentModal: {
      title: 'Comando en envío',
      subtitle: ({ seconds }) => `Dentro de ${seconds} segundos el comando se habrá enviado`,
    },
  },
  invoice: {
    title: 'Mi Factura',
    clientNo: 'Cliente Nro',
    plan: 'Plan',
    expiration: 'Vencimiento',
    serviceError: 'Error al consultar el servicio',
    buttons: {
      pay: 'Pagar',
      lastInvoices: 'Ver facturas anteriores',
      doubt: 'Tengo una duda con mi factura',
      share: 'Descargar o compartir la factura',
    },
    subtitles: {
      basicPlan: 'Abono Basico',
      aditional: 'Decodificador Adicional',
      premium: 'Programacion Premium',
      other: 'Otros Cargos',
      total: 'Total',
      expiration: 'Vencimiento de mis ofertas',
    },
  },
  balance: {
    title: 'Mi Saldo',
    rechargeOptions: 'Otras opciones de recarga',
    cardNumber: ({ cardNumber }) => `El número de tu Tarjeta Prepago es: ${cardNumber}`,
    availabilityDescription: 'Tenés disponible',
    noAvailability: 'No tenés saldo disponible',
    availability: ({ days }) => `${days} ${days === 1 ? 'día' : 'días'}`,
    dueDate: ({ dueDate }) => `Hasta el ${dueDate} inclusive`,
    buttons: {
      recharge: 'Recargar',
      SOS: 'Recarga SOS',
      giveMeBalance: 'Dame Saldo',
    },
  },
  profile: {
    title: 'Mis datos',
    logout: 'Logout',
  },
  help: {
    title: 'Ayuda',
    contentTitle: {
      tools: 'Herramientas',
      whatsApp: 'Consultas por Whatsapp',
    },
    errorExtensions: {
      title: 'Mensajes en pantalla',
      description:
        'Acceso rápido a los pasos necesarios para ayudarte a solucionar problemas con códigos de error y mensajes en pantalla.',
      buttonText: number => `Enviar Código ${number}`,
      actionDescription:
        'En este momento estamos enviando una señal a tu decodificador. \nPor favor, esperá mientras procesamos la operación:',
      minutes: 'Puede tardar unos minutos.',
      responseActionDescription: 'Señal enviada.\nRevisá si podés ver el canal.',
      problemSolved: '¿Se resolvió el problema?',
    },
    whatsApp: {
      title: 'WhatsApp',
      description: 'Resolvé tus dudas por WhatsApp al número de teléfono',
      buttonText: 'Enviar Mensaje',
      phoneNumber: '11 7044 1111',
    },
  },
  notifications: {
    title: 'Notificaciones',
  },
  tabs: {
    home: 'Inicio',
    plan: 'Mi Plan',
    invoice: 'Mi Factura',
    balance: 'Mi Saldo',
    help: 'Ayuda',
    profile: 'Mis datos',
  },
}
