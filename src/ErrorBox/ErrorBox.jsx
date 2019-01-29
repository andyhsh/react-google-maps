import React from 'react';
import PropTypes from 'prop-types';
import style from './ErrorBox.css';

function ErrorBox(props) {
  return (
    <div onClick={props.onClick} className={style.errorbox}>
      {props.message}
    </div>
  );
}

ErrorBox.propTypes = {
  message: PropTypes.string,
  onClick: PropTypes.func,
};

export default ErrorBox;
