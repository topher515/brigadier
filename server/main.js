import _ from 'lodash';

import firebase from 'firebase-admin';

import serviceAccount from 'path/to/serviceAccountKey.json';

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://brigadier-1d3bd.firebaseio.com'
});


const database = firebase.database()



// var Promise = require('promise');

const gameStatesById = {};
const gameIdsNeedingRunners = [];
const gameIntervalObjsByGameId = {}



function tickTiles({ tick, tiles }) {
  const newTiles = {}
  _.each(tiles, ({ owner, unit_count, type }, key)=> {
    if (tick % 4 === 0) {
      if (owner) {
        newTiles = { owner, unit_count: unit_count + 1, type };
      }
    } else {
      newTiles[key] = { owner, unit_count, type };
    }
  });
  return newTiles;
}


function tick(gameId) {

  const currentGameState = gameStatesById[gameId];

  const updatedTiles = tickTiles(currentGameState.tiles);

  const updatedGameState = _.extend({}, currentGameState, {
    tiles: updatedTiles,
    tick: currentGameState.tick + 1
  });


  database.ref(`game_states/${gameId}`).update(updatedGameState);

}


function checkForGameToRun() {

  if (gameIdsNeedingRunners.length > 0) {
    const gameId = gameIdsNeedingRunners.shift();
    console.log(`Found game to run 'gameId=${gameId}'`)
    gameIntervalObjsByGameId[gameId] = setInterval(tick.bind(null, gameId), 150);
  }
}


function start() {

  database.ref('game_states').on('child_added', ({ key, val })=> {

    gameStates[key] = val();
    gameIdsNeedingRunners.push(key);

  });


  setInterval(checkForGameToRun, 1000);

}



start();