import React, { Component } from 'react'
import Map from './WorldMap'
import fire from './fire'
import axios from 'axios'
const WEEZER_URL = 'https://rest.bandsintown.com/artists/weezer/events?app_id=d2f84baa059b6c4e9357a1726db9c11d&date=upcoming.json';

// const BANDS_URL = "https://rest.bandsintown.com/artists/" + str(artistName)
//     newurl = url + "/events?app_id=d2f84baa059b6c4e9357a1726db9c11d&date=upcoming"


class Home extends Component {
  constructor(props){
      super(props)
      this.state={
        tours: [],
        time: [],
        artistName: ''
      }
      this.saveSearch = this.saveSearch.bind(this);

      const fetchTours = () => {
        axios.get(WEEZER_URL).then((results) => {
          this.setState({ tours: results.data })
          setTimeout(fetchTours, 6000);
        })
      }
      fetchTours();

      const fetchTourTime = () => {
        axios.get(WEEZER_URL).then((results) => {
          this.setState({ time: results.data[100].datetime })
          setTimeout(fetchTours, 6000);
        })
      }
      fetchTourTime();
  }

  logout(){
      fire.auth().signOut();
  }
  saveSearch(artistName) {
    this.setState({artistName: artistName})
  }

    render() {

      function formatDate(string) {
      var options = { year: 'numeric' };
      return new Date(string).toLocaleDateString([], options);
    }
// Print a list of all the Weezer gigs in 2015
// Filter the datetime's of all the tours selected with 2015
        return (
            <div>
              <div className="nav">
                <h1>You are logged in {this.props.user.email}</h1>
                <Search onSubmit={this.saveSearch}/>
                <button onClick={this.logout}>Logout</button>
              </div>
              <Map />
            </div>
        )
    }
}
class Search extends Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    return (
      <div id="search">
        <form onSubmit={this._handleSubmit}>
          <label for="year">Year: </label>
          <input type="text" id="year" name="year"></input>
        </form>
      </div>
    )
  }
}
export default Home;
