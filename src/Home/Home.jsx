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
      loading: false,
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

    this.setState({ loading: true });

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
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  }

  onReset() {
    this.setState({ origin: '', destination: '', path: [] });
  }

  render() {
    return (
      <div className={style.homeContainer}>
        <div className={style.controls}>
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
          <div className={style.buttonControls}>
            <Button
              content="Submit"
              onClick={this.onSubmit}
              loading={this.state.loading}
              disabled={!this.state.origin || !this.state.destination || this.state.loading}
            />
            <Button content="Reset" onClick={this.onReset} disabled={this.state.loading} />
          </div>
        </div>
        <Map id="main-map" onLoad={this.onLoad} path={this.state.path} />
      </div>
    );
  }
}

export default Home;
