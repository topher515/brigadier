import _ from 'lodash';

import React from 'react'

export default ({ games, onGameIdChoose, onNewGameMake, onRunLogicGameIdChoose })=> (
  <div>
    Choose a game
    <ul>
      {
        _.map(games, ({ id, players })=> (
          <li>
            <a onClick={onGameIdChoose.bind(null, id)}>
              id: {id}; players: {players}
            </a>
            or (<a onClick={onRunLogicGameIdChoose.bind(null,id)}>run logic</a>)
          </li>
        ))
      }
    </ul>
    <a onClick={onNewGameMake}>New Game</a>
  </div>
)