import _ from 'lodash';
import React from 'react';

// import Board from 'models/board.js';

import Tile from './Tile.jsx';

const TilesUI = (props)=> (

  <div className="tiles" style={{position:'relative'}}>
    {
      _.map(props, (tileData, coord)=> {
        const [x, y] = _.map(coord.split(','), x => parseInt(x));
        return <Tile key={coord} x={x} y={y} {...tileData} />;
      })
    }
  </div>

);

export default TilesUI;