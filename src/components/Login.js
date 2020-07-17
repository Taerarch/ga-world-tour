import React, { Component } from 'react'
import fire from './fire';

class Login extends Component {
    constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state={
        email : "",
        password : "",
        message: ""
        }
    }
    login(e){ //Sign in
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            this.setState({message: u.message})
        }).catch((err)=>{
            this.setState({message: err.message})

        }) 
    }
    handleChange(e){ //Reading inputs
        this.setState({
            [e.target.name] : e.target.value
        })
    } 
    
    render()
    {
        return(
            <div>

                <form className="login">
                <br/><br/><br/>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" name="email" id="email" onChange={this.handleChange} value={this.state.email} className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" id="password" onChange={this.handleChange} value={this.state.password} className="form-control" placeholder="Enter password" />
                    </div>

                    <button  onClick={this.login} type="submit" className="btn btn-primary btn-block">Login</button>
                    <p className="forgot-password text-right">
                        Not user yet <a href="/signup">Sign Up?</a>
                    </p>
                    <h3 className="error">{this.state.message}</h3>
                </form>
            </div>
        )
    }
}

export default Login;
