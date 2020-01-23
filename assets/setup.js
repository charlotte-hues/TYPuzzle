
const tiles = document.querySelectorAll('#puzzle-grid button');

tiles.forEach(tile => tile.addEventListener('click', setUp))

let coloredTiles = [];

function setUp() {
    let thisTileArea = this.style.getPropertyValue('--area');
    this.style.setProperty('background', 'black');
    coloredTiles.push(thisTileArea);
    console.table(coloredTiles);
}