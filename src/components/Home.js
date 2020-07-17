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
        tours: [],
        band: "",
        url: ``,
        year: "",
        checkBoxChecked: [],
        favourites: {}
      }
      this.saveSearch = this.saveSearch.bind(this);
  }

  componentDidMount(){ //Get user's favourite list from firebase database
      fire.database().ref(`${this.props.user.uid}/favourites`).on("value",res => {
        this.setState({favourites: res.val()})
      })

  }

  mapClick = () => {
    this.child._mapTourCountry()
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

  handleCheckClick = (item) => { //Adding and removing a concert in the database
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

  checkFavouriteList(item){ //Showing the favourite list as a like button 
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
            <button className="btn btn-info" onClick={this.mapClick}>Map Tours</button>
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
        <h3 id="searchHead">Tour Search</h3>
        <form>
          
          <input size="1" type="text" id="band" name="band" onChange={this._handleChangeBand} value={this.state.content} required placeholder="Band..." />
          
          <input type="number" id="year" name="year" onChange={this._handleChangeTime} value={this.state.content} required className="form" placeholder="Year..." />

        </form>
      </div>
    )
  }
}
export default Home;
