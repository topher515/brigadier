import React from 'react';

import Tiles from './Tiles.jsx';


export default ({ players, gameId })=> (
  <div className="game">
    <div>GameID: { gameId}; Players: {players}</div>
    <Tiles gameId={gameId} />
  </div>
);