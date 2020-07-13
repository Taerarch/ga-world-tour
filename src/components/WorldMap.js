import React, { useState, Component } from 'react';
import World from '@svg-maps/world';
import { CheckboxSVGMap } from 'react-svg-map';
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
      selectedLocations: [],
      focusedLocation: '',
    }
    this._handleCountry = this._handleCountry.bind(this);
    // this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleLocationFocus = this._handleLocationFocus.bind(this);
    this._handleLocationBlur = this._handleLocationBlur.bind(this);
    this._handleOnChange = this._handleOnChange.bind(this);
    this._handleColorCountry = this._handleColorCountry.bind(this);
  }


  _handleCountry(event) {
    this.setState({ country: event.target.value });
  }

  _handleLocationFocus(event) {
  const focusedLocation = getLocationName(event);
  this.setState({ focusedLocation: focusedLocation });
  }

  _handleLocationBlur() {
  this.setState({ focusedLocation: null });
  }

  // _handleMouseOver(event) {
  //   const focusedLocation = getLocationName(event);
  //   this.setState({ focusedLocation : focusedLocation});
  // }

  _handleOnChange(selectedNodes) {
    console.log(selectedNodes);
		this.setState(prevState => {
			return {
				...prevState,
				selectedLocations: selectedNodes.map(node => node.attributes.name.value)
			};
		});
	}

  _handleColorCountry(countryId) {
    console.log(countryId.target.value, 'aqui')
    let country = document.getElementById(countryId.target.value);
    console.log(country, 'alla')
    country.style.fill = 'orange';
  }


  render() {
    return (
      <div>
        <select onChange={this._handleColorCountry}>
          {this.state.allCountries.map((country) => <option key={country.id} value={country.id}>{country.name}</option>)}
        </select>
        <CheckboxSVGMap map={World}
            onLocationFocus={this._handleLocationFocus}
						onLocationBlur={this._handleLocationBlur}
						onChange={this._handleOnChange} />
      </div>
    );
  }
}
export default WorldMap;
