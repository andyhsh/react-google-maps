import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput/TextInput';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(id, value) {
    this.props.onChange(id, value);
  }

  render() {
    const { id, value, placeholder, onChange } = this.props;

    return (
      <TextInput
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    )
  }
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Autocomplete;
