// var players = {};

var currentPlayerIdSingleton;

function set(playerId) {
  currentPlayerIdSingleton = playerId;
}

function get(playerId) {
  return currentPlayerIdSingleton
}

export {set, get};