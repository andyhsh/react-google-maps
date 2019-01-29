import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  return (
    <button onClick={props.onClick} disabled={props.disabled}>
      {props.content}
    </button>
  );
}

Button.propTypes = {
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
