import React, { Component } from 'react';
import World from '@svg-maps/world';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css'
import { getLocationName } from './MapFunctions';
import 'react-svg-map/src/svg-map.scss'
import WorldInfo from '../MapUtilities/MapInfo.js'
import '../App.css'



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

  }
  _handleCountry(event) {
    this.setState({ country: event.target.value });
  }
  colorCountry() {
  }


  _handleMouseOver(event) {
    const focusedLocation = getLocationName(event);
    this.setState({ focusedLocation : focusedLocation});
  }



  render() {
    return (
      <div>
        <select onChange={this.colorCountry}>
          {this.state.allCountries.map((country) => <option key={country.id} value={country.name}>{country.name}</option>)}
        </select>
        <SVGMap map={World} onLocationMouseOver={this._handleMouseOver} />
      </div>
    );
  }
}
export default WorldMap;
