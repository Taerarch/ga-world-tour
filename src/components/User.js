import React, { Component } from 'react'
import fire from './fire';
import { Button } from 'react-bootstrap';

class Login extends Component {
    constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state={
        email : "",
        password : "",
        message: ""
        }
    }
    login(e){
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            this.setState({message: u.message})
        }).catch((err)=>{
            this.setState({message: err.message})

        })
    }
    signup(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            this.setState({message: u.message})
        }).catch((err)=>{
            this.setState({message: err.message})
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render()
    {
        return(
            <div>
                <form>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="enter email address"
                    onChange={this.handleChange}
                    value={this.state.email}
                    />
                    <input
                    name="password"
                    type= "password"
                    onChange={this.handleChange}
                    id="password"
                    placeholder="enter password"
                    value={this.state.password}
                    />
                    <button onClick={this.login}>Login</button>
                    <button onClick={this.signup}>Signup</button>
                    <h3>{this.state.message}</h3>
                </form>
            </div>
        )
    }
}

export default Login;
