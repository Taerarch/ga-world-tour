import React, { useState, Component } from 'react';
import World from '@svg-maps/world';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css'
import { getLocationName } from './MapFunctions';
import 'react-svg-map/src/svg-map.scss'
import WorldInfo from '../MapUtilities/MapInfo.js'

class WorldMap extends Component {
  constructor() {
    super();
    this.state = {
      allCountries: WorldInfo.worldInfo.locations,
      country: '',
      focusedLocation: null,
    }
    this._handleCountry = this._handleCountry.bind(this);
    this._handleMouseOver = this._handleMouseOver.bind(this);
    const getAllCountries = () => {
      console.log(WorldInfo.worldInfo.locations);
      // this.setState({allCountries: [...this.state.allCountries, ]})
    }
    getAllCountries()
  }
  _handleCountry(event) {
    this.setState({ country: event.target.value });
  }
  colorCountry() {
  }
  _handleLocationFocus(event) {
    const focusedLocation = getLocationName(event);
    this.setState({ focusedLocation: focusedLocation });
  }
  _handleMouseOver(event) {
    // console.log(, 'aqui');
    const focusedLocation = getLocationName(event);
    this.setState({ focusedLocation : focusedLocation});
  }
  // getLocationClassName(location, index) {
  // // Generate random heat map
  // return `svg-map__location svg-map__location--heat${index % 4}`;
  // }
  render() {
    return (
      <div>
        <select option={ this.state.allCountries }>
        </select>
        <SVGMap map={World} onLocationMouseOver={this._handleMouseOver} />
      </div>
    );
  }
}
export default WorldMap;
