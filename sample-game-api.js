/*
  This file is included as a sample reference for the game. This is implemented as if there was no backend API, so it would not be a valid implementation as the NodeJS backend would have no concept of window or localStorage, but could easily be readapted to live on the server for requests.
*/

const storage = window.localStorage;

const GAME_DATA = {
  name: `Player #${Math.floor(Math.random() * 1000)}`,
  wins: 0,
  losses: 0,
  previousGame: { won: null, color: null },
  currentGameColors: []
};

const COLOR_CARNIVAL_DATA_KEY = "colorCarnivalData";
const RGB_COLORS = 256;
const MAX_COLORS = 6;

const randomNumber255 = () => {
  return Math.floor(Math.random() * RGB_COLORS);
};

// usage: const game = new Game(); game.getGameData();
class Game {
  constructor() {
    this.initGameData();
  }

  initGameData() {
    const gameData = storage.getItem(COLOR_CARNIVAL_DATA_KEY);
    if (gameData === undefined || gameData === null) {
      this.gameData = Object.assign({}, GAME_DATA);
    } else {
      this.gameData = Object.assign({}, GAME_DATA, JSON.parse(gameData));
    }
    this.resetGame();
  }

  saveGameData() {
    storage.setItem(COLOR_CARNIVAL_DATA_KEY, JSON.stringify(this.gameData));
  }

  // return the current game's data
  getGameData() {
    return this.gameData;
  }
  
  // set the name of the player
  setName(name) {
    this.gameData.name = name;
    this.saveGameData();
    return this.getGameData();
  }

  // choose the color by index and update the game state
  chooseColorByPosition(index) {
    const result = this.gameData.currentGameColors[index].winningIndex === true;
    this.gameData.previousGame = {
      won: result,
      color: Object.assign({}, this.gameData.currentGameColors[index])
    };

    if (result) {
      this.gameData.wins++;
    } else {
      this.gameData.losses++;
    }
    this.resetGame();
    this.saveGameData();
    return result;
  }

  // reset the game
  resetGame() {
    // update new winning index
    const winningIndex = Math.floor(Math.random() * MAX_COLORS);

    // reset all currentGameColors
    this.gameData.currentGameColors = [];
    for (let i = 0; i < MAX_COLORS; i++) {
      this.gameData.currentGameColors.push({
        red: randomNumber255(),
        green: randomNumber255(),
        blue: randomNumber255(),
        winningIndex: winningIndex === i
      });
    }

    // save the updated data
    this.saveGameData();
    return this.getGameData();
  }

  // clear all game data
  clearData() {
    storage.clear();
    this.initGameData();
  }
}

export default Game;
