const fixedGridData = (() => {
    const rowArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const patterns = {
      eight: ['b2','b3','b4','c4','d4','d3','d2','c2'],
      nine: ['b2','b3','b4','c4','d4','d3','d2','c2', 'c3'],
      ten: ['b2','b3','b4','c4','d4','d3','d2','c2','c1','c5'],
      eleven: ['b2','b3','b4','c4','d4','d3','d2','c2','c1','c5','c3'],
      typo: ['b1','b2','b4', 'b3','b5','b6','b7','g1','g2','g3','g4','g5','g6','g7','d4','e4']
    }
    const puzzleGrid = document.querySelector('#puzzle-grid');
    const gridArea = (gc, gr) =>  fixedGridData.rowArr[gr-1] + gc;
    const tiles =  document.querySelectorAll('.tile');
    return {rowArr, puzzleGrid, patterns, gridArea, tiles}
  })();
  
  const createPuzzle = (() => {
      const gridTemplateArea = (gc, gr) => {
          let rString = '';
          let string = '\"';
          for(let r=1; r<=gr; r++) {
              for(let c=1; c<=gc; c++) {rString = rString + ' ' + fixedGridData.gridArea(c, r);}
                  string = string + rString + ' \"';
                  rString = '\"';
          } return string;
      }
      const colourTiles = (p) => {
          for(let i=0; i<p.length; i++) {document.querySelector(`.${p[i]}`).classList.add('coloured');}
      };
      const addTileAttributes = (element, gc, gr) => {
        element.setAttribute('style', `--area:${fixedGridData.gridArea(gc,gr)}`);
        element.classList.add('tile', `${fixedGridData.gridArea(gc,gr)}`);
        // element.addEventListener('click', game.moveTile);
        element.disabled = true;
        return element;
      };
      const createTiles = (gc, gr) => {
          for(let r=1; r<=gr; r++) {
              for(let c=1; c<=gc; c++) {
                  (r===gr && c===gc) ? type='div' : type = 'button';
                  let tile = document.createElement(type);
                  addTileAttributes(tile, c, r);
                  fixedGridData.puzzleGrid.append(tile);
      }}};
      const createGrid = (column, row, pattern) => {
          fixedGridData.puzzleGrid.style.gridTemplateColumns = `repeat(${column}, 1fr)`;
          fixedGridData.puzzleGrid.style.gridTemplateAreas = gridTemplateArea(column, row);
          document.documentElement.style.setProperty('--aspectRatio', row/column);
          createTiles(column, row);
          colourTiles(pattern);
          unlockTiles(column, row, column, row);
      };
      const newPuzzle = (column, row, pattern) => {
        document.querySelectorAll('.tile').forEach(tile => fixedGridData.puzzleGrid.removeChild(tile));
        createGrid(column, row, pattern);
      }
      createGrid(5,5, fixedGridData.patterns.eight);
      return { newPuzzle,}
  })();
  
  // createPuzzle.newPuzzle(5,5,fixedGridData.patterns.nine)
  
  // function moveTile() {
  //     moveCount++;
  //     moveCounter.innerHTML = moveCount;
  //     const emptyTile = document.querySelector('#puzzle-grid div');
  //     let X = emptyTile.getBoundingClientRect().left - this.getBoundingClientRect().left;
  //     let Y = emptyTile.getBoundingClientRect().top - this.getBoundingClientRect().top;
  //     document.documentElement.style.setProperty('--moveX', `${X}px`);
  //     document.documentElement.style.setProperty('--moveY', `${Y}px`);
  //     const tiles = document.querySelectorAll('.tile');
  //     tiles.forEach(tiled => {
  //         tiled.disabled = true;
  //         tiled.classList.remove('above', 'right', 'left', 'below');
  //     });
  //     let emptyTileArea = emptyTile.style.getPropertyValue('--area');
  //     let thisTileArea = this.style.getPropertyValue('--area');
  //
  //     this.classList.add('move', 'animate');
  //     this.addEventListener('transitionend', function() {
  //         this.style.setProperty('--area', emptyTileArea);
  //         this.classList.remove(thisTileArea);
  //         this.classList.add(emptyTileArea);
  //         emptyTile.style.setProperty('--area', thisTileArea);
  //         this.classList.remove('move', 'animate');
  //         unlockTiles(thisTileArea);
  //     });
  // }


  function unlockTiles(gc, gr, colMax, rowMax) {
    let tileArr = [];
    let positionArr = [];
    if(gc>1) {
        tileArr.push(fixedGridData.gridArea(gc-1,gr));
        positionArr.push('right')};
    if(gc<colMax) {
        tileArr.push(fixedGridData.gridArea(gc+1,gr));
        positionArr.push('left')};
    if(gr<rowMax) {
        tileArr.push(fixedGridData.gridArea(gc,gr+1));
        positionArr.push('above')};
    if(gr>1) {
        tileArr.push(fixedGridData.gridArea(gc,gr-1));
        positionArr.push('below')};
    for(let i=0; i<tileArr.length; i++) {
        document.querySelector(`.${tileArr[i]}`).disabled = false;
        document.querySelector(`.${tileArr[i]}`).classList.add(positionArr[i]);
    }
    return tileArr;
  }
  