import React, { Component } from 'React';
import Map from '../Map/Map';
import TextInput from '../TextInput/TextInput';

class Home extends Component {
  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.state = {
      input: ''
    }
  }
  onLoad() {
    console.log('load google maps');
  }

  onChangeInput(id, value) {
    console.log(id, value);
    this.setState({ [id]: value })
  }

  render() {
    const hongKongCoords = {
      lat: 22.3964,
      lng: 114.1095
    }

    return (
      <div>
        <TextInput
          id="input"
          value={this.state.input}
          placeholder="Enter an Origin Location"
          onChange={this.onChangeInput}
        />
        <Map
          id="main-map"
          options={{
            zoom: 10,
            center: hongKongCoords
          }}
          onLoad={this.onLoad}
        />
      </div>
    );
  }
}

export default Home;
