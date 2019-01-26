import React, { Component } from 'React';
import Map from '../Map/Map';

class Home extends Component {
  onLoad() {
    console.log('load google maps');
  }

  render() {
    const hongKongCoords = {
      lat: 22.3964,
      lng: 114.1095
    }

    return (
      <div>
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
