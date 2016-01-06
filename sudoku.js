var Sudoku = function(data) 
{
  //   Private methods
  // -------------------------
  function getQuadrant(row, col){
    var ret = [];
    var sqrt = Math.sqrt(data.length);
    var quadX = Math.floor(col/sqrt);
    var quadY = Math.floor(row/sqrt);
    for (var r = quadY*sqrt; r < quadY*sqrt+sqrt; r++){
      for (var c = quadX*sqrt; c < quadX*sqrt+sqrt; c++){
        ret.push([r,c]);
      }
    }
    return ret;
  }
  function validNxN(data){
    var rows = data.length;
    if ( parseInt(Math.sqrt(rows)) != Math.sqrt(rows) ) {
      return false;
    }
    for (var r = 0; r < rows; r++){
      if (data[r].length != rows)
        return false;
    }
    return true;
  }
  function isNumeric(data){
    for (var r = 0; r < data.length; r++)
      for (var c = 0; c < data.length; c++)
        if (typeof data[r][c] != 'number' || parseInt(data[r][c]) != data[r][c]){
          
          return false;
        }
    return true;
  }
  function inValidQuadrant(row, col){
    var value = data[row][col];
    var quadrantCoords = getQuadrant(row,col);
    var count = quadrantCoords.reduce(function(p,c){
      if (data[c[0]][c[1]] == value) return p+1;
      else return p;
    }, 0);
    return count === 1;
  }
  function isValidRow(row){
    
    var res = data[row].slice(0).sort(function(a,b){return a-b;}).
      reduce(function(p,c){
        if (p === c) return c+1;
        else return false;
      }, 1);
    return typeof res === 'number';
  }
  function isValidCol(col){
    var cols = data.length;
    var temp = [];
    for (var i = 0; i < cols; i++){
      temp.push(data[i][col]);
    }
    var res = temp.sort(function(a,b){return a-b;}).
      reduce(function(p,c){
      if (p === c) return c+1;
      else return false;
    }, 1);
    return typeof res === 'number';
  }
  //   Public methods
  // -------------------------
  return {
    isValid: function() {
      // YOUR SOLUTION
      if (!validNxN(data)) return false;
      if (!isNumeric(data)) return false;
      for (var r = 0; r < data.length; r++){
        if (!isValidRow(r) ){ console.log("row invalid - "+r); return false;}
        if (!isValidCol(r) ){ console.log("col invalid - "+r); return false; }
      }
      for (var r = 0; r < data.length; r++){
        for (var c = 0; c < data.length; c++){
          if (!inValidQuadrant(r,c) ) return false;
        }
      }
      return true;
    }
  };
};