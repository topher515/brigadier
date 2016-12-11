// var players = {};

var currentPlayerIdSingleton;

function set(playerId) {
  currentPlayerIdSingleton = playerId;
}

function get() {
  return currentPlayerIdSingleton
}

export {set, get};