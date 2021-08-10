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
            user: {
                name: "Loading...",
                wins: "Loading...",
                losses: "Loading..."
            },
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
            console.log(this.state)
        })
    }

    onClick = async (e) => {
        // Make a request to the server
        let i = e.target.id;
    
        let res = await fetch("http://192.168.1.170:3001/send-result", {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem("jwtToken")
            },
            body: JSON.stringify({
                answer: `${i}`,
                wins: this.state.user.wins,
                losses: this.state.user.losses
            })
        })
        .then(res => res.json())
        .then(data => {
            this.setState(data)
            console.log(data)
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.user.name}'s COLOR GRID</h1>
                <h2>WINS: {this.state.user.wins}, LOSSES, {this.state.user.losses}</h2>
                
                <div>
                    <div className="center">
                        Color {this.state.colors[parseInt(this.state.choice)]}</div>

                    <div className="top-left" onClick={this.onClick} id={0}>
                        Color {this.state.colors[0]}</div>
                    <div className="top-right" onClick={this.onClick} id={1}>
                        Color {this.state.colors[1]}</div>
                    <div className="mid-left" onClick={this.onClick} id={2}>
                        Color {this.state.colors[2]}</div>
                    <div className="mid-right" onClick={this.onClick} id={3}>
                        Color {this.state.colors[3]}</div>
                    <div className="bot-left" onClick={this.onClick} id={4}>
                        Color {this.state.colors[4]}</div>
                    <div className="bot-right" onClick={this.onClick} id={5}>
                        Color {this.state.colors[5]}</div>
                </div>

                <div>
                    <p>San Francisco Time: {this.state.sftime}</p>
                    <p>New York Time: {this.state.nytime}</p>
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