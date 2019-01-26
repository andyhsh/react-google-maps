import React, { Component } from 'react';

class Map extends Component {
  constructor(props) {
    super(props);
  }

  onLoadMap() {
    const { id, options, onLoad } = this.props;
    const map = new window.google.maps.Map(document.getElementById(id), options);
    onLoad(map);
  }

  componentDidMount() {
    if (window.google) return this.onLoadMap();

    let scriptEl = document.createElement('script');
    scriptEl.type = 'text/javascript';
    scriptEl.src = `https://maps.google.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`;

    const firstScriptEl = document.getElementsByTagName('script')[0];
    firstScriptEl.parentNode.insertBefore(scriptEl, firstScriptEl);

    scriptEl.addEventListener('load', () => {
      this.onLoadMap();
    });
  }

  render() {
    const { id } = this.props;
    const style = {
      height: '100%',
      width: '100%'
    }

    return <div style={style} id={id} />;
  }
}

export default Map;
