import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import fire from './fire';
import {storage} from './fire'
import {Card, Button} from 'react-bootstrap'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "", number: "", url: "" }
        this.name = fire.database().ref().child('name')
        this.number = fire.database().ref().child('name')
        if (this.props.user.uid !== undefined){
            this.name = fire.database().ref().child(this.props.user.uid).child('name')
            this.number = fire.database().ref().child(this.props.user.uid).child('number')
        }
        
        this._handleChangeName = this._handleChangeName.bind(this);
        this._handleChangeNumber = this._handleChangeNumber.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        let downloadTask = null;
        if (props.user !== null){
            downloadTask = storage.ref(`images/${props.user.uid}`);
        }

        if (downloadTask !== null){
            this.state.url = downloadTask.getDownloadURL()
        }
        
          
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
            <div className="profile-page">
                <div>    
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={this.state.url.i} />
                        <Card.Body>
                            <Card.Title>{this.state.name}</Card.Title>
                            <Card.Text>
                                Phone number : {this.state.number}
                            </Card.Text>
                            <Link to='/video'>
                                <Button className="btn btn-info" >Take a picture</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </div>
                <div>
                    <br/>
                    <h3>Hello {this.state.name}</h3>
                    {this.state.number 
                    ? (<h4>Your phone number is {this.state.number}</h4>) 
                    : (null)}
                    <form onSubmit={this._handleSubmit}>
                        <div>
                            <label>Full name:</label>
                            <input type="text" id="name" name="name" onChange={this._handleChangeName} value={this.state.content}></input>
                        </div>
                        <div>
                            <label>Phone number: </label>
                            <input type="tel" id="number" name="phone" onChange={this._handleChangeNumber} value={this.state.content}></input>
                        </div>
                        <div>
                            <input type="submit" value="Edit"></input>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}

export default Profile