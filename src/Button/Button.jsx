import React from 'react';
import PropTypes from 'prop-types';
import style from './Button.css';

function Button(props) {
  const disabled = props.disabled ? style.disabled : '';

  return (
    <button
      className={`${style.button} ${disabled}`}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
    >
      {!props.loading && props.content}
      {props.loading && <div className={style.loading} />}
    </button>
  );
}

Button.propTypes = {
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Button;
