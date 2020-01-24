const rowArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const eightArr = ['b2','b3','b4','c4','d4','d3','d2','c2',]
const nineArr = ['b2','b3','b4','c4','d4','d3','d2','c2', 'c3',];
const tenArr = ['b2','b3','b4','c4','d4','d3','d2','c2','c1','c5'];
const elevenArr = ['b2','b3','b4','c4','d4','d3','d2','c2','c1','c5','c3'];
const typoArr = ['b1','b2','b4', 'b3','b5','b6','b7','g1','g2','g3','g4','g5','g6','g7','d4','e4'];
let column = 7;
let row = 9;

const puzzleGrid = document.querySelector('#puzzle-grid');
const moveCounter = document.querySelector('h3');
const gridButtons = document.querySelectorAll('#buttons-container button');
gridButtons.forEach(button => button.addEventListener('click', resizeGrid))

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
            tile.classList.add(`${gridArea(c,r)}`, 'tile')
            tile.addEventListener('click', moveTile);
            tile.disabled = true;
            puzzleGrid.append(tile);
        }
    }
    // colourTiles(typoArr);
    unlockTiles(gridArea(column, row));
}

createGrid(column,row);
const emptyTile = document.querySelector('#puzzle-grid div');
const tiles = document.querySelectorAll('.tile');
let moveCount = 0;

function moveTile() { 
    tiles.forEach(tile => {
        tile.disabled = true;
        tile.classList.remove('above', 'right', 'left', 'below');
    });
    let emptyTileArea = emptyTile.style.getPropertyValue('--area');
    let thisTileArea = this.style.getPropertyValue('--area');
    this.style.setProperty('--area', emptyTileArea);
    this.classList.remove(thisTileArea);
    this.classList.add(emptyTileArea);
    emptyTile.style.setProperty('--area', thisTileArea);
    moveCount++;
    moveCounter.innerHTML = moveCount;
    unlockTiles(thisTileArea);
}

function unlockTiles(emptyTile) {
    let tileArr = [];
    let positionArr = [];
    let emptyRow = emptyTile.slice(0,1);
    let r = rowArr.indexOf(emptyRow) +1;
    let c = parseInt(emptyTile.slice(1,2));
    console.log(c);
    if(c>1) {
        tileArr.push(gridArea(c-1,r));
        positionArr.push('right')};
    if(c<column) {
        tileArr.push(gridArea(c+1,r));
        positionArr.push('left')};
    if(r<row) {
        tileArr.push(gridArea(c,r+1));
        positionArr.push('above')};
    if(r>1) {
        tileArr.push(gridArea(c,r-1));
        positionArr.push('below')};

    for(let i=0; i<tileArr.length; i++) {
        console.log(tileArr[i]);
        document.querySelector(`.${tileArr[i]}`).disabled = false;
        document.querySelector(`.${tileArr[i]}`).classList.add(positionArr[i]);
    }
    return tileArr;
}

function colourTiles(type) {
    let tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.classList.remove('coloured'))
    for(let i=0; i<type.length; i++) {
    document.querySelector(`.${type[i]}`).classList.add('coloured');
    }
}

function clearGrid() {
    for(let i=0; i<(column*row); i++) {
        const gridTile = document.querySelector('.tile');
        puzzleGrid.removeChild(gridTile);
    }
}

function resizeGrid() {
    clearGrid();
    column = 5;
    row = 5;
    createGrid(column,row);
    console.log(this.id);
}
