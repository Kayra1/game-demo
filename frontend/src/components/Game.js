import { Component } from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import "../game.css"

const getGameData = () => {
    var gameData;
    let res = fetch("http://192.168.1.170:3001/start-game", {
        method:"GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem("jwtToken")
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })

    console.log(gameData)
}

class Game extends Component {
    constructor() {
        super();

        let firstGame = getGameData()
        console.log(firstGame)
    }

    render() {
        const {user} = this.props.auth
        return (
            <div>
                Hello, {this.state}
            </div>
        )
    }
}

Game.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps
) (Game)