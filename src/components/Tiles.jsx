/* globals firebase */

import React from 'react';

import TilesUI from './Tiles.ui.jsx';


const database = firebase.database();




class GameChooser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

    const { gameId } = this.props;

    this.dbRef = database.ref(`game_states/${gameId}/board/tiles`);

    this.dbRef.on('value', (snapshot)=> {
      this.setState(snapshot.val());
    })

  }

  componentWillUnmount() {
    this.dbRef.off('child_changed', this.listener);
  }

  render() {
    return <TilesUI {...this.state} />
  }
}

// AppComponent.defaultProps = {

// };

export default GameChooser;