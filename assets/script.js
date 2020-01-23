const rowArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const eightArr = ['b2','b3','b4','c4','d4','d3','d2','c2',]
const nineArr = ['b2','b3','b4','c4','d4','d3','d2','c2', 'c3',];
const tenArr = ['b2','b3','b4','c4','d4','d3','d2','c2','c1','c5'];
const elevenArr = ['b2','b3','b4','c4','d4','d3','d2','c2','c1','c5','c3'];
const typoArr = ['b1','b2','b4','b5','b6','b7','g1','g2','g3','g4','g5','g6','g7','d4','e4'];
let column = 7;
let row = 9;
        
const puzzleGrid = document.querySelector('#puzzle-grid');
const moveCounter = document.querySelector('h3');
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
let tileArray = [];
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
            tile.setAttribute('class', `${gridArea(c,r)}`)
            tile.addEventListener('click', moveTile);
            tile.disabled = true;
            tileArray.push(tile.id);
            puzzleGrid.append(tile);
        }
    }
    unlockTiles(gridArea(column, row));
}

createGrid(column,row);
const emptyTile = document.querySelector('#puzzle-grid div');
let moveCount = 0;

function moveTile() { 
    let emptyTileArea = emptyTile.style.getPropertyValue('--area')
    let thisTileArea = this.style.getPropertyValue('--area');
    this.style.setProperty('--area', emptyTileArea);
    emptyTile.style.setProperty('--area', thisTileArea);
    moveCount++;
    moveCounter.innerHTML = moveCount;
    unlockTiles(thisTileArea);
}

function unlockTiles(emptyTile) {
    let tileArr = [];
    let emptyRow = emptyTile.slice(0,1);
    let r = rowArr.indexOf(emptyRow) +1;
    let c = parseInt(emptyTile.slice(1,2));
    console.log(c);
    if(c>1) {tileArr.push(gridArea(c-1,r))};
    if(c<column) {tileArr.push(gridArea(c+1,r))};
    if(r<row) {tileArr.push(gridArea(c,r+1))};
    if(r>1) {tileArr.push(gridArea(c,r-1))};

    for(let i=0; i<tileArr.length; i++) {
        console.log(tileArr[i]);
        document.querySelector(`.${tileArr[i]}`).disabled = false;
    }
    return tileArr;
}

function colourTiles(){
  
}


