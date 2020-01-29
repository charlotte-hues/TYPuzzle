const puzzleGrid = ((column, row) => {
    const rowArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const puzzleGrid = document.querySelector('#puzzle-grid');
    const getAspectRatio = () => row/column;
    
    const gridArea = (c,r) =>  rowArr[r-1] + c;

    const gridTemplateArea = () => {
        let rString = '';
        let string = '\"';
        for(let r=1; r<=row; r++) {
            for(let c=1; c<=column; c++) {rString = rString + ' ' + gridArea(c, r);}
                string = string + rString + ' \"';
                rString = '\"';
        }
        return string;
    }

    const createGrid = (() => {
        puzzleGrid.style.gridTemplateColumns = `repeat(${column}, 1fr)`;
        puzzleGrid.style.gridTemplateAreas = gridTemplateArea(column, row);
    })();

    const createTiles = (() => {
        for(let r=1; r<=row; r++) {
            for(let c=1; c<=column; c++) {
                (r===row && c===column) ? type='div' : type = 'button';
                let tile = document.createElement(type);
                tile.setAttribute('style', `--area:${gridArea(c,r)}`);
                tile.classList.add('tile', `${gridArea(c,r)}`);
                // tile.addEventListener('click', game.moveTile);
                tile.disabled = true;
                puzzleGrid.append(tile);
            }
        }
    })();

    const clearGrid = () => {
        for(let i=0; i<column*row; i++) {
            const myTile = document.querySelector('.tile');
            puzzleGrid.removeChild(myTile);
        }
    }
    return { createGrid, createTiles, clearGrid, getAspectRatio}
})(2,2);

