require('normalize.css/normalize.css');
require('styles/App.css');

import _ from 'lodash';
import React from 'react';

let yeomanImage = require('../images/yeoman.png');

import {
  get as getCurrentPlayerId,
  set as setCurrentPlayerId } from 'stores/current-player.js'

import colorHash from 'lib/colorhash.js';


const database = firebase.database();



class AppComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playingGameId: null,
      runningLogicGameId: null
    }

    this.handleGameIdChoose = this.handleGameIdChoose.bind(this);
  }

  componentWillMount() {

    const playerRef = database.ref('players').push({
      color: colorHash(`${Math.random()}`)
    })
    setCurrentPlayerId(playerRef.key);

  }

  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />

        { !this.state.playingGameId
          ? <GameChooser 
              onGameIdChoose={this.handleGameIdChoose} 
              onRunLogicGameIdChoose={this.handleRunLogicGameIdChoose} />
          : <Game gameId={this.state.playingGameId} />
        }
        
        {
          !this.state.runningLogicGameId ? null :
          <GameLogicRunner gameId={this.state.runningLogicGameId} />
        }

      </div>
    );
  }

  handleGameIdChoose(gameId) {
    this.setState({
      playingGameId: gameId
    })
  }

  handleRunLogicGameIdChoose(gameId) {
    this.setState({
      runningLogicGameId: gameId
    })
  }
}

AppComponent.defaultProps = {

};

export default AppComponent;
