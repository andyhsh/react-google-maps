import React, { Component } from 'React';
import Map from './Map';

class Home extends Component {
  onLoad() {
    console.log('load google maps');
  }

  render() {
    const style = {
      width: '100vw',
      height: '100vh',
    };

    return (
      <div style={style}>
        <Map
          id="main-map"
          onLoad={this.onLoad}
        />
      </div>
    );
  }
}

export default Home;
