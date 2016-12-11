/* globals firebase */

const database = firebase.database();


class Tile {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }
}


game_states: { "1" {
  board: {
    width: 50,
    height: 50,
    tiles: {
      '1,1': { owner: "bob", unit_count: 50, type: "normal" },
      '1,2': {  }
    }
  }
  tick: 1
}

games: {
  "1": {
    players: {
      "bob":true,
      "tom":true,
      "wilhelm": true
    }
  },
  "2": {

  }

},
players: {

}