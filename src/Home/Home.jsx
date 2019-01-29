import React, { Component } from 'React';
import Map from '../Map/Map';
import Autocomplete from '../Autocomplete/Autocomplete';
import Button from '../Button/Button';
import MockApi from '../MockApi/MockApi';
import style from './Home.css';

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
      path: [],
      map: null,
    };
  }

  onLoad(map) {
    this.setState({ map });
  }

  onChangeInput(id, value) {
    this.setState({ [id]: value });
  }

  onSubmit() {
    const payload = {
      origin: this.state.origin,
      destination: this.state.destination,
    };

    MockApi.submitData(payload).then(response => {
      console.log('Home: ', response);
      MockApi.getRoute(response.token)
        .then(response => {
          console.log('Home getROute: ', response.path);
          this.setState({ path: response.path });
        })
        .catch(error => {
          console.log('Home error: ', error);
          if (error.status === 'failure') {
            // Display a error.error "Location not accessible by car"
          }
        });
    });
  }

  onReset() {
    this.setState({ origin: '', destination: '', path: [] });
  }

  render() {
    const hongKongCoords = {
      lat: 22.3964,
      lng: 114.1095,
    };

    return (
      <div className={style.homeContainer}>
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
        <Button
          content="Submit"
          onClick={this.onSubmit}
          disabled={!this.state.origin || !this.state.destination}
        />
        <Button content="Reset" onClick={this.onReset} />
        <Map
          id="main-map"
          options={{
            zoom: 12,
            center: hongKongCoords,
          }}
          onLoad={this.onLoad}
          path={this.state.path}
          originInput={this.state.origin}
          destinationInput={this.state.destination}
        />
      </div>
    );
  }
}

export default Home;
