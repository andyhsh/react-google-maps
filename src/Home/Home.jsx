import React, { Component } from 'React';
import Map from '../Map/Map';
import Autocomplete from '../Autocomplete/Autocomplete';
import Button from '../Button/Button';
import MockApi from '../MockApi/MockApi';

class Home extends Component {
  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.state = {
      origin: '',
      destination: '',
      map: null,
    };
  }

  onLoad(map) {
    this.setState({ map });
  }

  onChangeInput(id, value) {
    console.log('Home: ', id, value);
    this.setState({ [id]: value });
  }

  onSubmit() {
    const payload = {
      origin: this.state.origin,
      destination: this.state.destination
    };

    MockApi.submitData(payload).then(response => {
      console.log('Home: ', response);
    })
  }

  onReset() {
    this.setState({ origin: '', destination: '' })
  }

  render() {
    const hongKongCoords = {
      lat: 22.3964,
      lng: 114.1095,
    };

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
        <Button content="Submit" onClick={this.onSubmit} />
        <Button content="Reset" onClick={this.onReset} />
        <Map
          id="main-map"
          options={{
            zoom: 10,
            center: hongKongCoords,
          }}
          onLoad={this.onLoad}
        />
      </div>
    );
  }
}

export default Home;
