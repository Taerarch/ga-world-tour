import React, { Component } from 'react'
import Map from './WorldMap'
import fire from './fire'
import axios from 'axios'
const WEEZER_URL = 'https://rest.bandsintown.com/artists/weezer/events?app_id=d2f84baa059b6c4e9357a1726db9c11d&date=upcoming.json';
let BANDS_URL = `https://rest.bandsintown.com/artists//events?app_id=d2f84baa059b6c4e9357a1726db9c11d&date=upcoming`


class Home extends Component {
  constructor(props){
      super(props)
      this.state={
        tours: [],
        filteredTime: [],
        band: ""
      }
      this.saveSearch = this.saveSearch.bind(this);

      function formatDate(string) {
        var options = { year: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
      }
      const fetchTours = () => {
        axios.get(WEEZER_URL).then((results) => {
          this.setState({ tours: results.data })
        })
      }
      fetchTours();
      this.saveTours = this.saveTours.bind(this)
  }
  saveTours(content) {
    axios.post(WEEZER_URL)
  }

  logout(){
      fire.auth().signOut();
  }
  saveSearch(band, year) {
    this.setState({band: band, year: year})
  }
  render() {
    function formatToYear(string) {
      var options = { year: 'numeric' };
      return new Date(string).toLocaleDateString([], options);
    }
    function formatDate(string) {
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(string).toLocaleDateString([], options);
    }
    // Input the countries into WorldMap
    // Function to use the select country function and refresh the map
    // Problems: Selected multiple times might cause a problem

    return (
      <div>
        <div className="nav">
          <h1>You are logged in {this.props.user.email}</h1>
          <Search onSubmit={this.saveSearch} tours={this.state.tours}/>

          <button onClick={this.logout}>Logout</button>
        </div>
        <Map tourCountries={this.state.tours.filter(t => formatToYear(t.datetime) === `${this.state.year}`)} />
      </div>
    )
  }
}

class Search extends Component {
  constructor() {
    super();
    this.state = { year: "" }
    this._handleChangeBand = this._handleChangeBand.bind(this);
    this._handleChangeTime = this._handleChangeTime.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChangeBand(event) {
    this.setState({band: event.target.value});
  }

  _handleChangeTime(event) {
    this.setState({year: event.target.value})
  }
  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.band, this.state.year);
  }

  render() {
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <label for="band">Band: </label>
          <input type="text" id="band" name="band" onChange={this._handleChangeBand} value={this.state.content} required></input>

          <label for="year">Year: </label>
          <input type="integer" id="year" name="year" onChange={this._handleChangeTime} value={this.state.content} required></input>

          <input type="submit" value="Search"></input>
        </form>
      </div>
    )
  }
}
export default Home;
