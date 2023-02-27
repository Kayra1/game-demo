import { Component } from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import "../game.css"

const getGameData = async () => {
    var gameData;
    let res = await fetch("http://localhost:3001/start-game", {
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
        })
    }

    onClick = async (e) => {
        // Make a request to the server
        let i = e.target.id;
    
        let res = await fetch("http://localhost:3001/send-result", {
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
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.user.name}'s COLOR GRID</h1>
                <h2>WINS: {this.state.user.wins}, LOSSES, {this.state.user.losses}</h2>
                
                <div className="grid-container">
                    <div className="center">
                        <h3>FIND THIS COLOR</h3>
                        <p>{`rgb(${parseInt(this.state.colors[parseInt(this.state.choice)].slice(1,3), 16)}, ${parseInt(this.state.colors[parseInt(this.state.choice)].slice(3,5), 16)}, ${parseInt(this.state.colors[parseInt(this.state.choice)].slice(5,7), 16)})`}</p>
                    </div>

                    <div className="top-left" onClick={this.onClick} id={0}
                        style={{
                            backgroundColor: `${this.state.colors[0]}`
                        }}
                        >
                        Color 1</div>
                    <div className="top-right" onClick={this.onClick} id={1}
                        style={{
                            backgroundColor: `${this.state.colors[1]}`
                        }}>
                        Color 2</div>
                    <div className="mid-left" onClick={this.onClick} id={2}
                        style={{
                            backgroundColor: `${this.state.colors[2]}`
                        }}
                        >
                        Color 3</div>
                    <div className="mid-right" onClick={this.onClick} id={3}
                        style={{
                            backgroundColor: `${this.state.colors[3]}`
                        }}
                        >
                        Color 4</div>
                    <div className="bot-left" onClick={this.onClick} id={4}
                        style={{
                            backgroundColor: `${this.state.colors[4]}`
                        }}
                        >
                        Color 5</div>
                    <div className="bot-right" onClick={this.onClick} id={5}
                        style={{
                            backgroundColor: `${this.state.colors[5]}`
                        }}
                        >
                        Color 6</div>
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