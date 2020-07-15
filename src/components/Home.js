import React, { Component } from 'react'
import Map from './WorldMap'
import fire from './fire'
import axios from 'axios'
// const WEEZER_URL = 'https://rest.bandsintown.com/artists/weezer/events?app_id=d2f84baa059b6c4e9357a1726db9c11d&date=upcoming.json';
// let BANDS_URL = `https://rest.bandsintown.com/artists//events?app_id=d2f84baa059b6c4e9357a1726db9c11d&date=upcoming`


class Home extends Component {
  constructor(props){
      super(props)
      this.state={
        tours: [],
        band: "",
        url: ``,
        year: ""
      }
      this.saveSearch = this.saveSearch.bind(this);
  }

  mapClick = () => {
    this.child._mapTourCountry()
  }

  logout(){
    fire.auth().signOut();
  }

  saveSearch(band, year, url) {
    this.setState({band: band, year: year, url: url}, () => {
      axios.get(this.state.url).then((results) => {
        this.setState({ tours: results.data })
      })
    })

  }

  render() {
    return (
      <div>
        <h1>You are logged in {this.props.user.email}</h1>
        <button onClick={this.logout}>Logout</button>
        <Search onSubmit={this.saveSearch} year={this.state.year} onRef={ref => (this.child = ref)}/>
        <button onClick={this.mapClick}>Map Tours</button>
        <Map tourCountries={this.state.tours} year={this.state.year} onRef={ref => (this.child = ref)} />

      </div>
    )
  }
}

class Search extends Component {
  constructor() {
    super();
    this.state = {}
    this._handleChangeBand = this._handleChangeBand.bind(this);
    this._handleChangeTime = this._handleChangeTime.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChangeBand(event) {
    this.setState({
      band: event.target.value,
      url: `https://rest.bandsintown.com/artists/${event.target.value}/events?app_id=d2f84baa059b6c4e9357a1726db9c11d&date=`
    }, () => this._handleSubmit());
  }

  _handleChangeTime(event) {
    console.log(event.target.value);
    this.setState({ year: event.target.value }, () => this._handleSubmit())

  }

  _handleSubmit(event) {
    this.props.onSubmit(this.state.band, this.state.year, this.state.url + this.state.year);
  }



  render() {
    return (
      <div>
        <form>
          <label for="band">Band: </label>
          <input type="text" id="band" name="band" onChange={this._handleChangeBand} value={this.state.content} required></input>

          <label for="year">Year: </label>
          <input type="integer" id="year" name="year" onChange={this._handleChangeTime} value={this.state.content} required></input>

        </form>
      </div>
    )
  }
}
export default Home;
