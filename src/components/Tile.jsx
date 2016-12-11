import 'styles/tile.less';

import React from 'react';
import classNames from 'classnames';

const WIDTH = 25;
const HEIGHT = 25;



export default ({ x, y, owner, unit_count, type, className })=> (

  <div
    className={classNames('tile', type, className)}
    style={{
      left: `${WIDTH*x}px`,
      width: WIDTH,
      top: `${HEIGHT*y}px`,
      height: HEIGHT
    }}>
    { unit_count }
    
  </div>

)