/* globals firebase */

import _ from 'lodash';
import React from 'react';

import GameChooserUI from './GameChooserUI.jsx';

import { get as getCurrentPlayerId } from 'stores/current-player.js';

const database = firebase.database();


function newBoard({ width, height }) {
  const board = {
    tiles: {},
    width: width,
    height: height
  };
  
  _.each(_.range(width), (i)=> (
    _.each(_.range(height), (j)=> (
      board.tiles[`${i},${j}`] = { type: 'standard' }
    ))
  ))

  return board;
}



class GameChooser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      games: []
    }
  }

  componentDidMount() {
    this.dbRef = database.ref('games');
    this.listener = this.dbRef.on('child_added', ({ key, val })=> {

      this.setState((prevState) => ({
        games: prevState.games.concat([{ id:key, ...val()}])
      }));

    })
  }

  componentWillUnmount() {
    database.dbRef.off(this.listener);
  }

  render() {
    <GameChooserUI
      {...this.props}
      games={this.state.games}
      onNewGameMake={this.handleNewGameMake} />
  }

  handleNewGameMake() {
    const gameId = this.dbRef.push().key;

    database.update({
      [`active_games/${gameId}`]: true,
      [`games/${gameId}`]: { players: { [getCurrentPlayerId()]: true } },
      [`game_states/${gameId}`]: {

        board: newBoard({ width:50, height: 50 }),
        tick: 0

      }
    })

    this.props.onGameIdChoose(gameId);

  }
}

// AppComponent.defaultProps = {

// };

export default GameChooser;