import React, { Component } from 'react'
import Map from './WorldMap'
import fire from './fire'
import axios from 'axios'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      tours: [], // info from the api
      band: "", // Band doing the tour
      url: ``, // url of bandsintown api
      year: "", // Year of the tour
      checkBoxChecked: [], // checks if a concert has been liked or not
      favourites: {} // liked concerts
    }
    this.saveSearch = this.saveSearch.bind(this);
  }

  componentDidMount(){
    fire.database()
    .ref(`${this.props.user.uid}/favourites`)
    .on("value",res => {
      this.setState({favourites: res.val()})
    })

  }

  mapClick = () => {
    this.child._mapTourCountry()
  }


  saveSearch(band, year, url) { // saves the parameters of the search in the state
    this.setState({band: band, year: year, url: url}, () => {
      // and makes the axios requets to the api
      axios.get(this.state.url).then((results) => {
        // and saves the data from the api in the state
        this.setState({ tours: results.data })
      })
    })
  }

  formatYear(string) { // formats date to get the year
    var options = { year: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  formatDate(string) { // formats the date dd/mmmm/yyyy
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  handleCheckClick = (item) => { // checks if the user likes or dislikes a concerts and saves it in the database
    this.setState({checkBoxChecked: !this.state.checkBoxChecked})
    const fav = fire.database().ref().child(this.props.user.uid).child('favourites').child(item.id)
    if (this.state.favourites){
      if (this.state.favourites[item.id]){
        fav.remove()
      }else{
        fav.set(true)
      }
    }else{
      fav.set(true)
    }
  }

  checkFavouriteList(item){ // checks if a particular concert has been liked or not
    if (this.state.favourites){
      return !!this.state.favourites[item.id]
    }
  }

  render() {

    return (
      <div id="main">
        <div id="sideBar">
          <div>
            <Search onSubmit={this.saveSearch} year={this.state.year} onRef={ref => (this.child = ref)}/>
            <button onClick={this.mapClick}>Map Tours</button>
            <div id="tourList">
              {this.state.tours.filter((t) => this.formatYear(t.datetime) === this.state.year).map((t_filtered) => {
                const isChecked = this.checkFavouriteList(t_filtered)
                return <p>{t_filtered.venue.city}, {t_filtered.venue.country}<br></br> {this.formatDate(t_filtered.datetime)} <br></br> <FormControlLabel
                control={<Checkbox checked={isChecked} icon={<FavoriteBorder />}
                onChange={() => this.handleCheckClick(t_filtered)} value={t_filtered}
                checkedIcon={<Favorite />} name="checkedH" />}
                />
                </p>
              })}
            </div>
          </div>
        </div>
        {/* passes the tour info as a prop to the Map component */}
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

  _handleChangeBand(event) { // gets the band name from the user and creates the url for the api
    this.setState({
      band: event.target.value,
      url: `https://rest.bandsintown.com/artists/${event.target.value}/events?app_id=d2f84baa059b6c4e9357a1726db9c11d&date=`
    }, () => this._handleSubmit());
  }

  _handleChangeTime(event) { // gets the year of the tour from the user
    this.setState({ year: event.target.value }, () => this._handleSubmit())
  }

  _handleSubmit(event) { // handles the form submission
    this.props.onSubmit(this.state.band, this.state.year, this.state.url + this.state.year);
  }



  render() {
    return (
      <div>
        <form>
          <label for="band">Band: </label>
          <input type="text" id="band" name="band" onChange={this._handleChangeBand} value={this.state.content} required></input><br></br>
          <label for="year">Year: </label>
          <input type="integer" id="year" name="year" onChange={this._handleChangeTime} value={this.state.content} required></input>
        </form>
      </div>
    )
  }
}
export default Home;
