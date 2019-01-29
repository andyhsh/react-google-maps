import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    if (this.props.path.length && prevProps.path !== this.props.path) {
      this._displayRoute(this.props.path);
    }

    if (!this.props.path.length) {
      this._resetRoute();
    }
  }

  _onLoadMap() {
    const {
      id,
      options = {
        zoom: 16,
        center: { lat: 22.335399, lng: 114.176185 },
        mapTypeControl: false,
      },
      onLoad,
    } = this.props;
    this.map = new window.google.maps.Map(document.getElementById(id), options);
    this._initialiseDirectionsHandler();
    onLoad(this.map);
  }

  _initialiseDirectionsHandler() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
  }

  _displayRoute(path) {
    this.directionsDisplay.setMap(this.map);

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

  _resetRoute() {
    this.directionsDisplay.setMap(null);
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

Map.propTypes = {
  options: PropTypes.object,
  onLoad: PropTypes.func.isRequired,
  path: PropTypes.array,
};

export default Map;
