import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import World from '@svg-maps/world';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css';
import { getLocationName } from './MapFunctions';
import 'react-svg-map/src/svg-map.scss';
import WorldInfo from '../MapUtilities/MapInfo.js';
import '../App.css';
import _ from 'underscore';



class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCountries: WorldInfo.worldInfo.locations, // Info of all the countries on the map
      pointedLocation: null, // Pointed location by the mouse.
      tooltipStyle: { // Style of the info hover box.
        display: 'none',
      }
    };

    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleLocationMouseOut = this._handleLocationMouseOut.bind(this);
    this._handleColorCountry = this._handleColorCountry.bind(this);
    this._mapTourCountry = this._mapTourCountry.bind(this);
    this._handleLocationMouseMove = this._handleLocationMouseMove.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  _handleLocationMouseOut(event) { // Turns off the info hover box and sets the pointedLocation to null
    this.setState({
      pointedLocation: null,
      tooltipStyle: { display: 'none'}
    });
  }

  _handleLocationMouseMove(event) {
    const tooltipStyle = { // When the mouse is on the map it displays the info hover box
      // and it sets its position on the screen.
      position: 'fixed',
      display: 'block',
      top: event.clientY + 10,
      left: event.clientX + 100
    };
    this.setState({ tooltipStyle })
  }

  _handleColorCountry(tourCountry) {
    let allCountries = this.state.allCountries.find(country => country.name === tourCountry)
    if (allCountries) {
      const country = document.getElementById(allCountries.id); //get the toured countries,
      country.style.fill = 'orange'; // and paints them orange.
    }
  }

  formatYear(string) { // formats the date to get the year from the API
    var options = { year: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  _handleMouseOver(event) { //set the state of pointedLocation and filters the concerts for the hover info.
    const pointedLocation = getLocationName(event);
    const filterYear = this.props.tourCountries.filter( (tour) => this.formatYear(tour.datetime) === this.props.year);

    this.setState({
      pointedLocation : pointedLocation,
    });
  }

  formatDate(string) { // formats date into dd/mmmm/yyyy
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  _mapTourCountry() {
    const emptyMap = () => {
      const greenWorld = this.state.allCountries
      // The map function will iterate every country in the world and will paint it green (UPDATE: gray because global warming).
      greenWorld.map( (country) => document.getElementById(country.id).style.fill = '#ccc' )
    }

    emptyMap(); // empties the map for a new search.

    const findYear = this.props.tourCountries.filter((tour) => this.formatYear(tour.datetime) === this.props.year) //filters only the concerts from that year.
    const countryArray = findYear.map((tour) => tour.venue.country) // returns an array with the countries
    const filterCountryArray = _.uniq(countryArray) // gets rid of the duplicate countries

    const colourCountries = (index = 0) => {
      if (index !== filterCountryArray.length) {
        this._handleColorCountry(filterCountryArray[index])
        setTimeout(() => colourCountries(index + 1), 1000)
      }
    }
    colourCountries(); // using recursion colourCountries passes one country at a time to _handleColorCountry to paint them orange.
  }

  render() {
    return (
      <div id="mapDiv">
        <SVGMap map={World} // Select which map you want to use.
          // the Mouse functions come with react-svg-map package
          onLocationMouseOver={this._handleMouseOver}
          onLocationMouseOut={this._handleLocationMouseOut}
          onLocationMouseMove={this._handleLocationMouseMove}
        />
        <div className="examples__block__map__tooltip" style={this.state.tooltipStyle}>
          {this.props.tourCountries
            // filters the info for the info hover block
            .filter((t) => this.formatYear(t.datetime) === this.props.year && t.venue.country === this.state.pointedLocation)
            .map((t_filtered) => {
            return <p>{t_filtered.venue.name}, {t_filtered.venue.city}
              <br></br>
               {this.formatDate(t_filtered.datetime)}
              <br></br>
            </p>
          })}
        </div>
      </div>
    );
  }
}
export default WorldMap;
