import React, {Component} from "react"
import {Link} from "react-router-dom"

class Login extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            password: "",
            errors: {}
        }
    }
    
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value})
    }

    onSubmit = e => {
        e.preventDefault()
    
        const userData = {
            name: this.state.name,
            password: this.state.password
        }

        console.log(userData)
    }

    render() {
        const {errors} = this.state

        return (
            <div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div>
                        <input 
                            onChange={this.onChange}
                            value={this.state.name}
                            error={errors.name}
                            id="name"
                            type="name"/>
                        <label>User Name</label>
                    </div>
                    <div>
                        <input 
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            type="password"/>
                        <label>Password</label>
                    </div>
                    <div>
                        <button type="submit">Login/Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login
