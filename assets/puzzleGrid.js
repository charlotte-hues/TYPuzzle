'use strict';
const fixedData = (() => {
    const rowArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const patterns = {
      eight: ['b2','b3','b4','c4','d4','d3','d2','c2'],
      nine: ['b2','b3','b4','c4','d4','d3','d2','c2', 'c3'],
      ten: ['b2','b3','b4','c4','d4','d3','d2','c2','c1','c5'],
      eleven: ['b2','b3','b4','c4','d4','d3','d2','c2','c1','c5','c3'],
      typo: ['b1','b2','b4', 'b3','b5','b6','b7','g1','g2','g3','g4','g5','g6','g7','d4','e4']
    }
    const puzzleGrid = document.querySelector('#puzzle-grid');
    const moveCounter = document.querySelector('h3');
    return {rowArr, puzzleGrid, patterns, moveCounter}
})();
const puzzle = (() => {    
    let currentColumn, currentRow, currentPattern, moveCount;
    function moveTile () {
        const tiles = document.querySelectorAll('.tile');
        const emptyTile = document.querySelector('#puzzle-grid div');
        const emptyTileArea = emptyTile.style.getPropertyValue('--area');
        const thisTileArea = this.style.getPropertyValue('--area');
        const convertArea = () => {
          const emptyRow = thisTileArea.slice(0,1);
          const gr = fixedData.rowArr.indexOf(emptyRow) +1;
          let gc = parseInt(thisTileArea.slice(1,2));
          unlockTiles(gc, gr, currentColumn, currentColumn);
        }
        const moveCounter = (() => {
              moveCount++;
              fixedData.moveCounter.innerHTML = moveCount;
        })();
        const removeClasses = (() => {
          tiles.forEach(tile => {
              tile.disabled = true;
              tile.classList.remove('above', 'right', 'left', 'below');
          });
        })();
        const positionTileOnGrid = () => {
          this.style.setProperty('--area', emptyTileArea);
          emptyTile.style.setProperty('--area', thisTileArea);
          this.className.replace(thisTileArea, emptyTileArea);
        }
        const finishAnimation = () => {
          this.classList.remove('move', 'animate');
          positionTileOnGrid();
          convertArea();

        }
        const animateTile = (() => {
            let X = emptyTile.getBoundingClientRect().left - this.getBoundingClientRect().left;
            let Y = emptyTile.getBoundingClientRect().top - this.getBoundingClientRect().top;
            document.documentElement.style.setProperty('--moveX', `${X}px`);
            document.documentElement.style.setProperty('--moveY', `${Y}px`);
            this.classList.add('move', 'animate');
            this.addEventListener('transitionend', finishAnimation);
        })();
    };
    const gridArea = (gc, gr) =>  fixedData.rowArr[gr-1] + gc;
    const unlockTiles = (gc, gr, colMax, rowMax) => {
      const tileArr = [];
      const positionArr = [];
      if(gc>1) {
          tileArr.push(gridArea(gc-1,gr));
          positionArr.push('right')};
      if(gc<colMax) {
          tileArr.push(gridArea(gc+1,gr));
          positionArr.push('left')};
      if(gr<rowMax) {
          tileArr.push(gridArea(gc,gr+1));
          positionArr.push('above')};
      if(gr>1) {
          tileArr.push(gridArea(gc,gr-1));
          positionArr.push('below')};
      for(let i=0; i<tileArr.length; i++) {
          document.querySelector(`.${tileArr[i]}`).disabled = false;
          document.querySelector(`.${tileArr[i]}`).classList.add(positionArr[i]);
      }
      return { tileArr, positionArr };
    }
    const gridTemplateArea = (gc, gr) => {
        let rString = '';
        let string = '\"';
        for(let r=1; r<=gr; r++) {
            for(let c=1; c<=gc; c++) {rString = rString + ' ' + gridArea(c, r);}
                string = string + rString + ' \"';
                rString = '\"';
        } return string;
    }
    const colourTiles = (p) => {
      for(let i=0; i<p.length; i++) {document.querySelector(`.${p[i]}`).classList.add('coloured');}
    };
    const addTileAttributes = (element, gc, gr) => {
      element.setAttribute('style', `--area:${gridArea(gc,gr)}`);
      element.classList.add('tile', `${gridArea(gc,gr)}`);
      element.disabled = true;
      return element;
    };
    const createTiles = (gc, gr) => {
      for(let r=1; r<=gr; r++) {
            for(let c=1; c<=gc; c++) {
              let type;
                (r>=gr && c>=gc) ? type='div' : type = 'button';
                let tile = document.createElement(type);
                addTileAttributes(tile, c, r);
                tile.addEventListener('click', moveTile);
                fixedData.puzzleGrid.append(tile);
    }}};
    const createGrid = (column, row, pattern) => {
        fixedData.puzzleGrid.style.gridTemplateColumns = `repeat(${column}, 1fr)`;
        fixedData.puzzleGrid.style.gridTemplateAreas = gridTemplateArea(column, row);
        document.documentElement.style.setProperty('--aspectRatio', row/column);
        createTiles(column, row);
        colourTiles(pattern);
        unlockTiles(column, row, column, row)
        currentColumn = column;
        currentRow = row;
        currentPattern = pattern;
    };
    const clearGrid = () => {
      document.querySelectorAll('.tile').forEach(tile => fixedData.puzzleGrid.removeChild(tile));
      moveCount = 0;
      fixedData.moveCounter.innerHTML = moveCount;
    }
    const newPuzzle = (column, row, pattern) => {
      clearGrid();
      createGrid(column, row, pattern);
    }
    const resetPuzzle = () => {
      newPuzzle(currentColumn, currentRow, currentPattern);
    }
    return { newPuzzle,  moveTile, resetPuzzle}
})();
const nav = (() => {
  const newButton = document.querySelector('#new');
  const menuButton = document.querySelector('#menu');
  const closeMenuButton = document.querySelector('#close-menu');
  const gridButtons = document.querySelectorAll('.grid-selector');
  const openNav = () => { document.querySelector('nav').style.width = '100vw';}
  const closeNav = () => { document.querySelector('nav').style.width = '0vw';}
  closeMenuButton.addEventListener('click', closeNav);
  menuButton.addEventListener('click', openNav);
  newButton.addEventListener('click', function refreshGrid() {
      puzzle.resetPuzzle();
      closeNav();
  });
  gridButtons.forEach(button => button.addEventListener('click', function selectNewPuzzle() {
    puzzle.newPuzzle(this.dataset.column, this.dataset.row, fixedData.patterns[this.dataset.pattern]);
    closeNav();
  }))
})();
window.onload = puzzle.newPuzzle(5,5, fixedData.patterns.eight);
