import _ from 'lodash';

import firebase from 'firebase-admin';

import serviceAccount from '../brigadier-1d3bd-firebase-adminsdk-32rj9-300ac96ba6.secret.json';

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://brigadier-1d3bd.firebaseio.com'
});


const database = firebase.database()



// var Promise = require('promise');

const gameStatesById = {};
const gameIdsNeedingRunners = [];
const gameIntervalObjsByGameId = {}




function tick(gameId) {

  const currentGameState = gameStatesById[gameId];

  const updatedGameState = {
    board: {
      width: currentGameState.board.width,
      height: currentGameState.board.height,
      tiles: {}
    },
    tick: currentGameState.tick + 1
  };

  var fastIncrVal = 0;
  var standardIncrVal = 0;
  if (currentGameState.tick % 15 === 0) {
    standardIncrVal = 1;
    fastIncrVal = 3
  } 
  // else if (currentGameState.tick % 10 === 0) {
  //   standardIncrVal = 1;
  //   fastIncrVal = 1;
  // }

  _.each(currentGameState.board.tiles, ({ owner, unit_count, type }, coord)=> {

    updatedGameState.board.tiles[coord] = {
      owner: (owner || null),
      unit_count: (unit_count || 0) + (type === 'fast' ? fastIncrVal : standardIncrVal),
      type
    };
  });

  // Update our copy of the game
  gameStatesById[gameId] = updatedGameState;

  // Tell clients
  database.ref(`game_states/${gameId}`).update(updatedGameState);

}


function checkForGameToRun() {

  if (gameIdsNeedingRunners.length > 0) {
    const gameId = gameIdsNeedingRunners.shift();
    console.log(`Found game to run 'gameId=${gameId}'`)
    gameIntervalObjsByGameId[gameId] = setInterval(tick.bind(null, gameId), 300);
  }
}


function start() {

  console.log('started watching for games to run...')

  database.ref('game_states').on('child_added', (snapshot)=> {

    gameStatesById[snapshot.key] = snapshot.val();
    gameIdsNeedingRunners.push(snapshot.key);

  });


  setInterval(checkForGameToRun, 1000);

}



start();