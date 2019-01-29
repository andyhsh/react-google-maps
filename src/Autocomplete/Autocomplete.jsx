import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput/TextInput';
import style from './Autocomplete.css';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.autocomplete && nextProps.map) {
      this._initialiseAutocomplete(nextProps.map);
    }
  }

  _initialiseAutocomplete(map) {
    this.autocomplete = new google.maps.places.Autocomplete(this.inputRef.current);
    this.autocomplete.bindTo('bounds', map);
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();
      this.props.onChange(this.props.id, place.formatted_address);
    });
  }

  render() {
    return <TextInput forwardedRef={this.inputRef} {...this.props} />;
  }
}

Autocomplete.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Autocomplete;
