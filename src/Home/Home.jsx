import React, { Component } from 'React';
import Map from '../Map/Map';
import Autocomplete from '../Autocomplete/Autocomplete';

class Home extends Component {
  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.state = {
      origin: '',
      destination: '',
      map: null,
    }
  }
  onLoad(map) {
    this.setState({ map });
  }

  onChangeInput(id, value) {
    console.log('Home: ', id, value);
    this.setState({ [id]: value })
  }

  render() {
    const hongKongCoords = {
      lat: 22.3964,
      lng: 114.1095
    }

    return (
      <div>
        <Autocomplete
          id="origin"
          value={this.state.origin}
          placeholder="Enter an Origin Location"
          map={this.state.map}
          onChange={this.onChangeInput}
        />
        <Autocomplete
          id="destination"
          value={this.state.destination}
          placeholder="Enter a Destination Location"
          map={this.state.map}
          onChange={this.onChangeInput}
        />
        <Map
          id="main-map"
          options={{
            zoom: 10,
            center: hongKongCoords
          }}
          onLoad={this.onLoad}
          originInput
          destinationInput
        />
      </div>
    );
  }
}

export default Home;
