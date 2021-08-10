import React, {Component} from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { loginUser } from "../actions/authActions"
import classnames from "classnames"

class Login extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            password: "",
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/account")
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/account")
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
        
        this.props.loginUser(userData)
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { loginUser }
) (Login)
