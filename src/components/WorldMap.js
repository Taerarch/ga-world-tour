import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import World from '@svg-maps/world';
import { SVGMap } from 'react-svg-map';
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
      focusedLocation: '',
      pointedLocation: null,
      tooltipStyle: {
        display: 'none',
      }
    };

    this._handleCountry = this._handleCountry.bind(this);
    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleLocationMouseOut = this._handleLocationMouseOut.bind(this);
    this._handleOnChange = this._handleOnChange.bind(this);
    this._handleColorCountry = this._handleColorCountry.bind(this);
    this._mapTourCountry = this._mapTourCountry.bind(this);
    this._handleLocationMouseMove = this._handleLocationMouseMove.bind(this);
    this.getLocationClassName = this.getLocationClassName.bind(this);
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

  _handleLocationMouseOut(event) {
    this.setState({
      pointedLocation: null,
      tooltipStyle: { display: 'none'}
    });
  }

  _handleLocationMouseMove(event) {
    const tooltipStyle = {
      position: 'fixed',
      display: 'block',
      top: event.clientY + 10,
      left: event.clientX + 100
    };
    this.setState({ tooltipStyle })
  }

  getLocationClassName(location, index) {
    console.log(location, index, 'aqui');
    return ('svg-map__location');
  }

  _handleOnChange(selectedNodes) {
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

  _handleMouseOver(event) {
    const pointedLocation = getLocationName(event);
    const filterYear = this.props.tourCountries.filter( (tour) => this.formatYear(tour.datetime) === this.props.year);
    const filterCountry = _.filter(filterYear, (tour) => {
      if (tour.venue.country === pointedLocation) {
        return tour
      }}
    );
    this.setState({
      pointedLocation : pointedLocation,
    });
  }

  formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
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
    const filterCountryArray = _.uniq(countryArray)

    const colourCountries = (index = 0) => {
      if (index !== filterCountryArray.length) {
        this._handleColorCountry(filterCountryArray[index])
        setTimeout(() => colourCountries(index + 1), 1000)
      }
    }
    colourCountries();
  }
  render() {
    return (
      <div id="mapDiv">
        <SVGMap map={World}
          getLocationClassName={this.getLocationClassName}
          onChange={this._handleOnChange}
          onLocationMouseOver={this._handleMouseOver}
          onLocationMouseOut={this._handleLocationMouseOut}
          onLocationMouseMove={this._handleLocationMouseMove}
        />
        <div className="examples__block__map__tooltip" style={this.state.tooltipStyle}>
          {this.props.tourCountries.filter((t) => this.formatYear(t.datetime) === this.props.year && t.venue.country === this.state.pointedLocation).map((t_filtered) => {
            return <p>{t_filtered.venue.city}, {t_filtered.venue.country}<br></br> {this.formatDate(t_filtered.datetime)} <br></br>
            </p>
          })}
        </div>
      </div>
    );
  }
}
export default WorldMap;
