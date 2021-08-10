import { Component } from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import "../game.css"

const getGameData = async () => {
    var gameData;
    let res = await fetch("http://192.168.1.170:3001/start-game", {
        method:"GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem("jwtToken")
        }
    })
    .then(res => res.json())
    .then(data => {
        gameData = data
    })

    return gameData
}

class Game extends Component {
    constructor() {
        super();

        this.state = {
            colors: [
                "#000000", "#000000", "#000000",
                "#000000", "#000000", "#000000"],
            choice: "0",
            sftime: "00:00 AM",
            nytime: "00:00 AM",
            previousResult: false
        }
    }

    componentDidMount() {
        getGameData()
        .then(gameData => {
            this.setState(gameData)
        })
    }

    onChoose = i => {
        // Make a request to the server
    }

    render() {
        const {user} = this.props.auth
        return (
            <div>
                <h1>{user.name}'s COLOR GRID</h1>
                <h2>WINS: {user.wins}, LOSSES, {user.losses}</h2>
                
                <div>
                    <div className="top-left">Color {this.state.colors[0]}</div>
                    <div className="top-right">Color {this.state.colors[1]}</div>
                    <div className="mid-left">Color {this.state.colors[2]}</div>
                    <div className="mid-right">Color {this.state.colors[3]}</div>
                    <div className="bot-left">Color {this.state.colors[4]}</div>
                    <div className="bot-right">Color {this.state.colors[5]}</div>
                </div>

                <div>
                    <p>San Francisco Time: {this.sftime}</p>
                    <p>New York Time: {this.nytime}</p>
                </div>


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