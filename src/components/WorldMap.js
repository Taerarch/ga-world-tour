import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import World from '@svg-maps/world';
import { CheckboxSVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css'
import { getLocationName } from './MapFunctions';
import 'react-svg-map/src/svg-map.scss'
import WorldInfo from '../MapUtilities/MapInfo.js'
import '../App.css'
import _ from 'underscore'
import leaflet from 'leaflet'


const emptyCountries = []

const StyledDot = styled.h1`
  left: ${props => props.long + 'px'};
  top: ${props => props.lat + 'px'};
  position: absolute;
  color: red;
  font-size: 60px;
  margin: 0px;
  line-height: 1px;
`



class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCountries: WorldInfo.worldInfo.locations,
      country: '',
      selectedLocations: emptyCountries,
      focusedLocation: '',
      dotArray: []

    }
    this._handleCountry = this._handleCountry.bind(this);
    // this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleLocationFocus = this._handleLocationFocus.bind(this);
    this._handleLocationBlur = this._handleLocationBlur.bind(this);
    this._handleOnChange = this._handleOnChange.bind(this);
    this._handleColorCountry = this._handleColorCountry.bind(this);
    this._mapTourCountry = this._mapTourCountry.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
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
    let allCountries = this.state.allCountries.find(country => country.name === tourCountry)

    if (allCountries) {
      const country = document.getElementById(allCountries.id); //get the toured countries,
      country.style.fill = 'orange';
    }
  }

  formatYear(string) {
    var options = { year: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  _mapTourCountry() {
    const emptyMap = () => {
      const greenWorld = this.state.allCountries
      // The map function will iterate every country in the world and will paint it green.
      greenWorld.map( (country) => document.getElementById(country.id).style.fill = '#ccc' )
    }

    emptyMap(); // painting the world green before a new search.

    const findYear = this.props.tourCountries.filter((tour) => this.formatYear(tour.datetime) === this.props.year)
    const countryArray = findYear.map((tour) => tour.venue.country)
    const latArray = findYear.map((tour) => tour.venue.latitude)
    const longArray = findYear.map((tour) => tour.venue.longitude)
    const filterCountryArray = _.uniq(countryArray)

    const plotDots = (index = 0) => {
      if (index !== countryArray.length) {
        this._handlePlotDots(latArray[index], longArray[index])
        setTimeout(() => plotDots(index + 1), 1000)
      }
    }
    plotDots();

    const colourCountries = (index = 0) => {
      if (index !== filterCountryArray.length) {
        this._handleColorCountry(filterCountryArray[index])
        setTimeout(() => colourCountries(index + 1), 1000)
      }
    }
    colourCountries();
  }
  _handlePlotDots(la, lon) {
    console.log(parseFloat(la), parseFloat(lon));
    this.setState({dotArray: [...this.state.dotArray, <StyledDot long={parseFloat(lon)/4556} lat={parseFloat(la)+666}>.</StyledDot>]})
  }
  // {dots.map((dot, index) => <StyledDot long={dot[0]} lat={dot[1]}>.</StyledDot>
  // )}

  // {this.state.dotArray.map((dot) => dot)}
  // <StyledDot long={27} lat={16}>.</StyledDot>
  // <StyledDot long={777} lat={666}>.</StyledDot>

  render() {
    return (
      <div id="mapDiv">
        <CheckboxSVGMap map={World}
            onLocationFocus={this._handleLocationFocus}
						onLocationBlur={this._handleLocationBlur}
						onChange={this._handleOnChange} />
      </div>
    );
  }
}
export default WorldMap;
