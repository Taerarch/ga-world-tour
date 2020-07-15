import React, { Component } from 'react'
import fire from './fire';
import {Link} from 'react-router-dom'

export default class Signup extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signup = this.signup.bind(this);
        this.state={
            email : "",
            password : "",
            confirmPassword: '',
            message: ""
            }
    }

    signup(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            this.setState({message: "Signed up"})
            return <Link to='/' />;
        }).catch((err)=>{
            this.setState({message: err.message})
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit(e) {
        
        const { password, confirmPassword } = this.state;
        // perform all neccassary validations
        if (password !== confirmPassword) {
            e.preventDefault();
            this.setState({message: "Passwords don't match"})
            
        } else {
            this.signup(e)
            
        }
    }
    render() {
        return (
            
            <form className="login">
                <br/><br/><br/>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" id="email" onChange={this.handleChange} value={this.state.email} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" id="password" onChange={this.handleChange} value={this.state.password} className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Confim Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" onChange={this.handleChange} value={this.state.confirmPassword} className="form-control" placeholder="Confirm password" />
                </div>

                <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/">Sign In?</a>
                </p>
                <h3 className="error">{this.state.message}</h3>
            </form>
        )
    }
}
