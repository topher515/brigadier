import _ from 'lodash';
import React from 'react';

// import Board from 'models/board.js';

// import Tile from './Tile.js';

const TilesUI = (props)=> (

  <div className="board">
    {
      _.map(props, (tileData, coord)=> {
        const [x, y] = coord.split(',');
        return <Tile x={x} y={y} {...tileData} />;
      })
    }
  </div>


);

export default TilesUI;