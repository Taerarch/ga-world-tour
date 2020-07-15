import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import fire from './fire';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "", number: "" }
        
        this.name = fire.database().ref().child('name')
        this.number = fire.database().ref().child('name')
        if (this.props.user.uid !== undefined){
            this.name = fire.database().ref().child(this.props.user.uid).child('name')
            this.number = fire.database().ref().child(this.props.user.uid).child('number')
        }
        
        this._handleChangeName = this._handleChangeName.bind(this);
        this._handleChangeNumber = this._handleChangeNumber.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
      }

      componentDidMount(){
        this.name.on('value', snap =>{
            this.setState({
                name: snap.val()
            })
        })
        this.number.on('value', snap =>{
            this.setState({
                number: snap.val()
            })
        })
      }

      _handleChangeName(event) {
        this.setState({name: event.target.value});
      }
    
      _handleChangeNumber(event) {
        this.setState({number: event.target.value})
      }
      _handleSubmit(event) {
        event.preventDefault();
        fire.database().ref().child(this.props.user.uid).child('name').set(this.state.name)
        fire.database().ref().child(this.props.user.uid).child('number').set(this.state.number)
      }

    render() {
        return (
            <div>
                <h3>Profile page</h3>
                <br/>
                <h3>Hello {this.state.name}</h3>
                {this.state.number 
                ? (<h4>Your phone number is {this.state.number}</h4>) 
                : (null)}
                <form onSubmit={this._handleSubmit}>
                    <label>Full name: </label>
                    <input type="text" id="name" name="name" onChange={this._handleChangeName} value={this.state.content}></input>

                    <label>Phone number: </label>
                    <input type="tel" id="number" name="phone" onChange={this._handleChangeNumber} value={this.state.content}></input>

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