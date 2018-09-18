import PropTypes from "prop-types";

/**
 * custom render-component
 */
export default PropTypes.objectOf(
  PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)])
);
