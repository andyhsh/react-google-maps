import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: props.value,
    };
  }

  onChange(event) {
    const { id, onChange } = this.props;
    const value = event.target.value;
    this.setState({ value });
    return onChange(id, value);
  };

  render() {
    const { value } = this.state;
    const { id, placeholder } = this.props;
    return (
      <div>
        <input
          id={id}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={this.onChange}
        />
      </div>
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
