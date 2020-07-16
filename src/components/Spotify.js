import React, { Component } from 'react';
import Player from './Player';
import axios from 'axios';


export const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "6de752bf270d454ab8f2d681a173935f";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];
// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

class Spotify extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{url: ''}]
        },
        name: '',
        duration_ms: 0,
      },
      is_playing: 'Paused',
      progress_ms: 0,
    };

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }

  getCurrentlyPlaying(token) {
    axios.get('https://api.spotify.com/v1/me/player', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then( (data) => {
      this.setState({
        item: data.item,
        is_playing: data.is_playing,
        progress_ms: data.progress_ms,
      });
    })
  }

  componentDidMount() {
  // Set token
  let _token = hash.access_token;
  if (_token) {
    // Set token
    this.setState({
      token: _token
    });
  }
}

  render() {
    return (
      <div className="spotifyComponent">
        <header className="App-header">
        <img src={'../logo'} className="App-logo" alt="logo" />
        {!this.state.token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}
        {this.state.token && (
        <Player />
        )}
        </header>
      </div>
    );
  }
}

export default Spotify;
