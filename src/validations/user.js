import * as yup from 'yup'

/**
 * Field validations
 */
const username = yup
  .string()
  .email('validations:invalidCharacters')
  .min(3, 'validations:user.firstName.minLength')
  .max(30, 'validations:user.firstName.maxLength')
  .required('validations:required')

const password = yup.string().required('validations:required')

/**
 * Form validations
 */
export const loginFormSchema = yup.object().shape({
  username,
  password,
})
