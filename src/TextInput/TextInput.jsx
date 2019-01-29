import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './TextInput.css';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { id, onChange } = this.props;
    const value = event.target.value;
    onChange(id, value);
  };

  render() {
    const { id, placeholder, forwardedRef, value } = this.props;
    return (
      <input
        id={id}
        className={style.input}
        ref={forwardedRef}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={this.onChange}
      />
    );
  }
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  value: '',
  placeholder: '',
};

export default TextInput;
