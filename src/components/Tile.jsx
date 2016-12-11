import 'styles/tile.less';


const WIDTH = 25;
const HEIGHT = 25;



export default ({ x, y, owner, unit_count, type })=> (

  <div
    className="tile"
    style={{
      left: `${WIDTH*x}px`,
      top: `${HEIGHT*y}px`,
      backgroundColor: !owner ? 'white' : owner.color
    }}>
    { unit_count }
    
  </div>

)