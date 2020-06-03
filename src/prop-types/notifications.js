import PropTypes from 'prop-types'

export const notificationPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
})
