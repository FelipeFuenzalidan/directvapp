import PropTypes from 'prop-types'

export const balancePropTypes = PropTypes.shape({
  availability: PropTypes.number.isRequired,
  dueDate: PropTypes.string.isRequired,
})
