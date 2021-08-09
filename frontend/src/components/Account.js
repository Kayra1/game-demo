import { Component } from "react";
import { logoutUser } from "../actions/authActions";
import PropTypes from "prop-types"
import { connect } from "react-redux";

class Account extends Component { 
    onLogoutClick = e => {
        e.preventDefault()
        this.props.logoutUser()
    }

    render() {
        const {user} = this.props.auth
        console.log(user)
        return (
            <div>
                <h1>Name: {user.name}</h1>
                <button onClick={this.onLogoutClick}>Logout</button>
            </div>
        )
    }
}

Account.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { logoutUser }
) (Account)
