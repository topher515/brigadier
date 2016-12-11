/* globals firebase */

import React from 'react';

import GameUI from './Game.ui.jsx';


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

    this.listenerPlayers = this.dbRefPlayers.on('child_added', ({ key })=> {

      this.setState((prevState)=> ({
        players: prevState.players.concat([key])
      }))

    })

  }

  componentWillUnmount() {
    this.dbRefPlayers.off('child_added', this.listenerPlayers);
  }

  render() {
    return <GameUI {...this.props} players={this.state.players} />;
  }
}

// AppComponent.defaultProps = {

// };

export default GameChooser;