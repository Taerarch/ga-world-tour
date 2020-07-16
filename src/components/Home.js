import React, { Component } from 'react'
import Map from './WorldMap'
import fire from './fire'
import axios from 'axios'
<<<<<<< HEAD
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
=======
>>>>>>> 2f0734ad54b32eb7d70a80634b5df1d7c7c3fae4


class Home extends Component {
  constructor(props){
      super(props)
      this.state={
        tours: [],
        band: "",
        url: ``,
        year: "",
        checkBoxChecked: [],
        favourites: {}
      }
      this.saveSearch = this.saveSearch.bind(this);
  }
  componentDidMount(){
    if (fire.database().ref(`${this.props.user.uid}/favourites`)){
      fire.database().ref(`${this.props.user.uid}/favourites`).on("value",res => {
        this.setState({favourites: res.val()})
      })
    }
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

  formatYear(string) {
    var options = { year: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  handleCheckClick = (item) => {
    
    this.setState({checkBoxChecked: !this.state.checkBoxChecked})
    console.log(item.id)
    const fav = fire.database().ref().child(this.props.user.uid).child('favourites').child(item.id)
    
      fav.set(true)

  }

  checkFavouriteList =(item) => !!this.state.favourites[item.id]

  render() {
    return (
      <div>
        <div id="sideBar">
          <h1 id="logTitle">You are logged in {this.props.user.email}</h1>
          <button onClick={this.logout}>Logout</button>
          <Search onSubmit={this.saveSearch} year={this.state.year} onRef={ref => (this.child = ref)}/>
          <button onClick={this.mapClick}>Map Tours</button>
          <div id="tourList">
            {this.state.tours.filter((t) => this.formatYear(t.datetime) === this.state.year).map((t_filtered) => {
              const isChecked = this.checkFavouriteList(t_filtered)
              return <p>{t_filtered.venue.city}, {t_filtered.venue.country} {this.formatDate(t_filtered.datetime)} <FormControlLabel
              control={<Checkbox checked={isChecked} icon={<FavoriteBorder />} 
              onChange={() => this.handleCheckClick(t_filtered)} value={t_filtered}
              checkedIcon={<Favorite />} name="checkedH" />}
              />
              </p>         
          })}
          </div>
        </div>
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
          <input type="text" id="band" name="band" onChange={this._handleChangeBand} value={this.state.content} required></input><br></br>
          <label for="year">Year: </label>
          <input type="integer" id="year" name="year" onChange={this._handleChangeTime} value={this.state.content} required></input>
        </form>
      </div>
    )
  }
}
export default Home;
