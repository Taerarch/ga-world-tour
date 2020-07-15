import React, { Component } from 'react'
import {Link} from 'react-router-dom'


class Profile extends Component {
    constructor() {
        super();
        this.state = { name: "", number: "" }
        this._handleChangeName = this._handleChangeName.bind(this);
        this._handleChangeNumber = this._handleChangeNumber.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
      }

      _handleChangeName(event) {
        this.setState({name: event.target.value});
      }
    
      _handleChangeNumber(event) {
        this.setState({number: event.target.value})
      }
      _handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.band, this.state.year);
      }

    render() {
        return (
            <div>
                <h3>Profile page</h3>
                <form onSubmit={this._handleSubmit}>
                    <label for="band">Full name: </label>
                    <input type="text" id="name" name="name" onChange={this._handleChangeName} value={this.state.content} required></input>

                    <label for="year">Phone number: </label>
                    <input type="tel" id="number" name="phone" onChange={this._handleChangeNumber} value={this.state.content} required></input>

                    <input type="submit" value="Edit"></input>
                </form>
                
                <Link to="/video">
                    <li>Edit profile picture</li>
                </Link>
                
            </div>
        )
    }
}

export default Profile