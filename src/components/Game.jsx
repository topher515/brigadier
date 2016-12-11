/* globals firebase */

import React from 'react';

import GameUI from './GameChooserUI.jsx';


const database = firebase.database();




class GameChooser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      players: []
    }
  }

  componentDidMount() {

    const { gameId } = this.props;

    this.dbRefPlayers = database.ref(`games/${gameId}/players`);

    this.listenerPlayers = this.dbRefPlayers.on('child_added', ({ key, val })=> {

      this.setState((prevState)=> ({
        players: prevState.players.concat([key])
      }))

    })


    this.dbRefTiles = database.ref(`game_state/${gameId}/tiles`);

    this.listenerTiles = this.dbRefPlayers.on('child_added', ({ key, val })=> {

      this.setState((prevState)=> ({
        players: prevState.players.concat([key])
      }))

    })

  }

  componentWillUnmount() {
    this.dbRefPlayers.off(this.listenerPlayers);
  }

  render() {
    <GameChooserUI {...this.props} games={this.state.games} />
  }
}

// AppComponent.defaultProps = {

// };

export default GameChooser;