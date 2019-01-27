import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  return <button onClick={props.onClick}>{props.content}</button>
}

Button.propTypes = {
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
