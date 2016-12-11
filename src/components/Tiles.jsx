/* globals firebase */

import React from 'react';

import TilesUI from './TilesUI.jsx';


const database = firebase.database();




class GameChooser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

    const { gameId } = this.props;

    this.dbRef = database.ref(`game_state/${gameId}/board/tiles`);

    this.listener = this.dbRef.on('child_changed', ({ key, val })=> {

      this.setState({ [key]: val() });

    })

  }

  componentWillUnmount() {
    this.dbRef.off(this.listener);
  }

  render() {
    <TilesUI {...this.state} />
  }
}

// AppComponent.defaultProps = {

// };

export default GameChooser;