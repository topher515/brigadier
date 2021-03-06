/* globals firebase */

import _ from 'lodash';
import React from 'react';

import GameChooserUI from './GameChooser.ui.jsx';

import { get as getCurrentPlayerId } from 'stores/current-player.js';

const database = firebase.database();


function newBoard({ width, height }) {
  const board = {
    tiles: {},
    width: width,
    height: height
  };
  
  _.each(_.range(width), (i)=> {
    _.each(_.range(height), (j)=> {

      if (Math.random() > 0.90) {
        board.tiles[`${i},${j}`] = { type: 'fast' };
      
      } else {
        board.tiles[`${i},${j}`] = { type: 'standard' };
      }


    })
  })

  return board;
}



class GameChooser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      games: []
    }

    this.handleNewGameMake = this.handleNewGameMake.bind(this);
  }

  componentDidMount() {
    this.dbRef = database.ref('games');
    this.listener = this.dbRef.on('child_added', (snapshot)=> {
      this.setState((prevState) => ({
        games: prevState.games.concat([{ id:snapshot.key, ...snapshot.val()}])
      }));

    })
  }

  componentWillUnmount() {
    this.dbRef.off('child_added', this.listener);
  }

  render() {
    return <GameChooserUI
      {...this.props}
      games={this.state.games}
      onNewGameMake={this.handleNewGameMake} />;
  }

  handleNewGameMake() {
    const gameId = this.dbRef.push().key;

    database.ref().update({
      [`active_games/${gameId}`]: true,
      [`games/${gameId}`]: { players: { [getCurrentPlayerId()]: true } },
      [`game_states/${gameId}`]: {

        board: newBoard({ width:15, height: 15 }),
        tick: 0

      }
    })

    this.props.onGameIdChoose(gameId);

  }
}

// AppComponent.defaultProps = {

// };

export default GameChooser;