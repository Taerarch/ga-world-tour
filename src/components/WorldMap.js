import React, { Component } from 'react';
import World from '@svg-maps/world';
import { CheckboxSVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css'
import { getLocationName } from './MapFunctions';
import 'react-svg-map/src/svg-map.scss'
import WorldInfo from '../MapUtilities/MapInfo.js'
import '../App.css'
import _ from 'underscore'



class WorldMap extends Component {
  constructor(props) {
    super(props);
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
    this._mapTourCountry = this._mapTourCountry.bind(this);


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

  _handleColorCountry(tourCountry) {
    const allCountries = this.state.allCountries.filter(country => country.name === tourCountry)
    const country = document.getElementById(allCountries[0].id); //get the toured countries,
    country.style.fill = 'orange';
  }


  _mapTourCountry() {
    const countryArray = this.props.tourCountries.map((country) => {return country.venue.country})
    const filterCountryArray = _.uniq(countryArray)
    const colourCountries = (index = 0) => {
      if (index !== filterCountryArray.length - 1) {
        this._handleColorCountry(filterCountryArray[index])
        setTimeout(() => colourCountries(index + 1), 3000)
      }
    }
    colourCountries()
  }




  render() {
    return (
      <div>
        <select onChange={this._mapTourCountry}>
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
