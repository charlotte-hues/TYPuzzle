const tiles = document.querySelectorAll('#puzzle-grid button');

tiles.forEach(tile => tile.addEventListener('click', setUp))

let colouredTiles = [];
function setUp() {
    let thisTileArea = this.style.getPropertyValue('--area');
    this.style.setProperty('background', 'black');
    colouredTiles.push(thisTileArea);    
    console.log(colouredTiles);
}