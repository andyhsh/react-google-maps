import React, { Component } from 'react';

class Map extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (window.google) return this._onLoadMap();

    let scriptEl = document.createElement('script');
    scriptEl.type = 'text/javascript';
    scriptEl.src = `https://maps.google.com/maps/api/js?key=${
      process.env.GOOGLE_MAPS_API_KEY
    }&libraries=places`;

    const firstScriptEl = document.getElementsByTagName('script')[0];
    firstScriptEl.parentNode.insertBefore(scriptEl, firstScriptEl);

    scriptEl.addEventListener('load', () => {
      this._onLoadMap();
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.path.length && prevProps.path === this.props.path) {
      this._displayRoute(this.props.path);
    }
  }

  _onLoadMap() {
    const { id, options, onLoad } = this.props;
    const map = new window.google.maps.Map(document.getElementById(id), options);
    this._initialiseDirectionsHandler(map);
    onLoad(map);
  }

  _initialiseDirectionsHandler(map) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(map);
  }

  _displayRoute(path) {
    const { origin, waypoints, destination } = this._buildRouteObject(path);
    const request = {
      origin,
      waypoints,
      destination,
      travelMode: 'DRIVING',
    };

    this.directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(result);
      }
    });
  }

  _buildRouteObject(path) {
    let route = { waypoints: [] };

    path.forEach((p, index) => {
      if (index === 0) {
        route.origin = new google.maps.LatLng(p[0], p[1]);
      }
      if (index === path.length - 1)
        return (route.destination = new google.maps.LatLng(p[0], p[1]));

      const waypoint = {
        location: new google.maps.LatLng(p[0], p[1]),
        stopover: false,
      };
      route.waypoints.push(waypoint);
    });

    return route;
  }

  render() {
    const { id } = this.props;
    const style = {
      height: '100%',
      width: '100%',
    };

    return <div style={style} id={id} />;
  }
}

export default Map;
