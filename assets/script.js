const rowArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
        
        
const puzzleGrid = document.querySelector('#puzzle-grid');
const gridArea = (column, row) => {return rowArr[row-1] + column;}
        
function gridTemplateArea(column, row) {
    let rString = '';
    let string = '\"';
    for(let r=1; r<=row; r++) {
        for(let c=1; c<=column; c++) {rString = rString + ' ' + gridArea(c, r);}
            string = string + rString + ' \"';
            rString = '\"';
        }
    return string;
}

function createGrid(column, row) {
    puzzleGrid.style.gridTemplateColumns = `repeat(${column}, 1fr)`;
    puzzleGrid.style.gridTemplateRows = `repeat(${row}, 1fr)`;
    puzzleGrid.style.gridTemplateAreas = gridTemplateArea(column, row);
    let type;
    for(let r=1; r<=row; r++) {
        for(let c=1; c<=column; c++) {
            (r===row && c===column) ? type='div' : type = 'button';
            let tile = document.createElement(type);
            tile.setAttribute('style', `--area:${gridArea(c,r)}`);
            tile.addEventListener('click', moveTile);
            puzzleGrid.append(tile);
        }
    }
}
createGrid(7,9);
const emptyTile = document.querySelector('#puzzle-grid div');

// let coloredTiles = [];

// function setUp(bob) {
//     let thisTileArea = bob.style.getPropertyValue('--area');
//     bob.style.setProperty('background', 'black');
//     coloredTiles.push(thisTileArea);
//     console.table(coloredTiles);
// }

const eightArr = ['b2','b3','b4','c4','d4','d3','d2','c2',]
const nineArr = ['b2','b3','b4','c4','d4','d3','d2','c2', 'c3',];
const tenArr = ['b2','b3','b4','c4','d4','d3','d2','c2','c1','c5'];
const elevenArr = ['b2','b3','b4','c4','d4','d3','d2','c2','c1','c5','c3'];

function moveTile() {
 
    let emptyTileArea = emptyTile.style.getPropertyValue('--area')
    let thisTileArea = this.style.getPropertyValue('--area');
    console.log(thisTileArea);
    console.log(emptyTileArea);
    this.style.setProperty('--area', emptyTileArea);
    emptyTile.style.setProperty('--area', thisTileArea);
}

function colourTiles(column, row, num){
    let colouredTiles = [];
    let c = (column + 1) / 2;
    let r = (row + 1) / 2;
    colouredTiles.push(gridArea(c-1, r));
    colouredTiles.push(gridArea(c+1, r));
    colouredTiles.push(gridArea(c-1, r-1));
    colouredTiles.push(gridArea(c+1, r-1));
    colouredTiles.push(gridArea(c+2, r-1));
    colouredTiles.push(gridArea(c-1, r+1));
    colouredTiles.push(gridArea(c+1, r+1));
    colouredTiles.push(gridArea(c+2, r+1));


    console.log(c + ',' + r);
    console.log(gridArea(c-1, r));

}

