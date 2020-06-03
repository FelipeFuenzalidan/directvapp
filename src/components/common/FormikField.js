import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '~/components/common/TextField'

/**
 * FormikField
 */
const FormikField = props => {
  const {
    component: Component,
    field: { name },
    form,
    withErrorMessage,
    ...rest
  } = props
  // eslint-disable-next-line no-unused-vars
  const { touched, errors, setFieldValue, setFieldTouched, dirty } = form
  const error = errors[name] && 'Error'
  const value = form.values[name]

  return (
    <Component
      name={name}
      onBlur={setFieldTouched}
      onChange={setFieldValue}
      error={touched[name] && error}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      value={value}
    />
  )
}

/**
 * FormikTextField
 */
export const FormikTextField = props => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <FormikField component={TextField} {...props} />
}

FormikField.propTypes = {
  form: PropTypes.shape({
    handleSubmit: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    onValidationChange: PropTypes.func,
  }).isRequired,
  field: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  withErrorMessage: PropTypes.bool,
}
FormikField.defaultProps = {
  withErrorMessage: false,
}

FormikTextField.propTypes = FormikField.propTypes
FormikTextField.defaultProps = FormikField.defaultProps
