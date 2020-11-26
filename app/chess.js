// Cameron Samuels

document.addEventListener("DOMContentLoaded", function() {
  
  // =========
  // VARIABLES
  // =========
  
  var TYPES = ["P", "R", "N", "B", "K", "Q"];
  var pieces = [];
  var board = [];
  var board_ui = [];
  var table = document.querySelector("table").rows;
  
  
  
  // =======
  // RANDOMS
  // =======
  
  function rand_pos() {
    return Math.floor(Math.random() * 4);
  }
  
  function rand_i(n) {
    return Math.floor(Math.random() * n);
  }
  
  
  
  // =========
  // PLACEMENT
  // =========
  
  function return_piece(t, r, c, i) {
    if (t === 0)
      return new Pawn(r, c, i);
    else if (t === 1)
      return new Rook(r, c, i);
    else if (t === 2)
      return new Knight(r, c, i);
    else if (t === 3)
      return new Bishop(r, c, i);
    else if (t === 4)
      return new King(r, c, i);
    else if (t === 5)
      return new Queen(r, c, i);
  }
  
  
  function pieces_left() {
    var k = 0;
    for (let i = 0; i < pieces.length; i++)
      if (pieces[i])
        k++;
    return k;
  }
  
  
  function place(r, c) {
    var type = Math.floor(Math.random() * 6);
    var i = pieces.length;
    var piece = return_piece(type, r, c, i);
    board[r][c] = piece;
    pieces.push(piece);
  }
  
  
  function place_random() {
    var r = rand_pos();
    var c = rand_pos();
    if (board[r][c] !== 0) {
      place_random();
      return;
    }
    place(r, c);
  }
  
  
  function place_in_target(i) {
    var targets = pieces[i].targets();
    if (targets.length > 0) {
      var target = targets[rand_i(targets.length)];
      var r = target[0];
      var c = target[1];
      if (board[r][c] !== 0 && targets.length > 1) // TODO INFINITE LOOP
        return place_in_target(i);
      place(r, c);
      return true;
    }
    else return false;
  }
  
  
  function place_in_hypo_target(i, j) {
    var type = TYPES.indexOf(pieces[i].type);
    var r = pieces[j].row;
    var c = pieces[j].col;
    var piece = return_piece(type, r, c, null);
    var targets = piece.targets();
    if (targets.length === 0)
      return false;
    var target = targets[Math.floor(Math.random() * targets.length)];
    if (board[target[0]][target[1]] !== 0)
        return place_in_hypo_target(i, j); // TODO INFINITE LOOP
    place(target[0], target[1]);
  }
  
  
  function place_for_target(r, c) {
    // TODO
  }
  
  
  function place_for_target_piece(i) {
    var r = pieces[i].row;
    var c = pieces[i].col;
    place_for_target(r, c);
  }
  
  
  function remove_jumps(targets) {
    // TODO
  }
  
  
  
  // =========
  // GAME PLAY
  // =========
  
  var selectedPiece;
  document.querySelector("table").addEventListener("click", function(e) {
    if (e.target.tagName != "TD")
      return;
    function clear_board() {
      for (let i = 0; i < board_ui.length; i++)
      for (let j = 0; j < board_ui[i].length; j++)
        board_ui[i][j].style.background = "";
    }
    var r = parseInt(e.target.id.split("-")[0]);
    var c = parseInt(e.target.id.split("-")[1]);
    var piece = board[r][c];
    if (e.target.style.background && piece) {
      pieces[board[r][c].i] = 0;
      board[r][c] = selectedPiece;
      board[selectedPiece.row][selectedPiece.col] = 0;
      board[r][c].r = r;
      board[r][c].c = c;
      selectedPiece = 0;
      refresh();
      clear_board();
      if (pieces_left() == 1)
        reset();
    }
    else if (piece) {
      clear_board();
      selectedPiece = piece;
      var targets = piece.targets();
      for (let i = 0; i < targets.length; i++) {
        let a = targets[i][0];
        let b = targets[i][1];
        board_ui[a][b].style.background = "#ccc";
      }
    }
    else {
      clear_board();
      selectedPiece = 0;
    }
  });
  
  
  
  //===============
  // INITIALIZATION
  // ==============
  
  function refresh() {
    for (let i = 0; i < board.length; i++)
      for (let j = 0; j < board[i].length; j++)
        board_ui[i][j].textContent = board[i][j].type;
  }
  
  function reset() {
    pieces = [];
    board = [];
    board_ui = [];
    for (let i = 0; i < table.length; i++) {
      board_ui[i] = table[i].cells;
      board.push([0,0,0,0]);
    }
    
    // FIRST
    place_random();
    
    // SECOND
    var second = 0;
    while (!second) second = place_in_target(0);
    
    // THIRD
    place_in_hypo_target(0, 1);
    
    // FOURTH
    place_in_hypo_target(0, 2);
    
    refresh();
  }
  
  reset();
  
  
});
