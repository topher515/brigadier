import _ from 'lodash';

import React from 'react'

export default ({ games, onGameIdChoose, onNewGameMake })=> (
  <div className="game-chooser">
    Choose a game
    <ul>
      {
        _.map(games, ({ id, players })=> {
          return (
            <li key={id} >
              <a onClick={onGameIdChoose.bind(null, id)}>
                id: {id}; players: {_.keys(players)}
              </a>
            </li>
          )
        })
      }
    </ul>
    <a onClick={onNewGameMake}>New Game</a>
  </div>
);