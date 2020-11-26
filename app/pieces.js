// Cameron Samuels

class Piece {
  constructor(r, c, i) {
    this.r = r;
    this.c = c;
    this.i = i
  }
  get row() {
    return parseInt(this.r);
  }
  get col() {
    return parseInt(this.c);
  }
  get ind() {
    return parseInt(this.i);
  }
}


class Pawn extends Piece {
  targets() {
    let r = parseInt(this.r), c = parseInt(this.c);
    var targets = [];
    if (r > 0) {
      if (c > 0) targets.push([r - 1, c - 1]);
      if (c < 3) targets.push([r - 1, c + 1]);
    }
    return targets;
  }
  get type() {
    return 'P';
  }
}


class Rook extends Piece {
  targets() {
    let r = parseInt(this.r), c = parseInt(this.c);
    var targets = [];
    for (let i = r - 1; i >= 0; i--)
      targets.push([i, c]);
    for (let i = r + 1; i <= 3; i++)
      targets.push([i, c]);
    for (let i = c - 1; i >= 0; i--)
      targets.push([r, i]);
    for (let i = c + 1; i <= 3; i++)
      targets.push([r, i]);
    return targets;
  }
  get type() {
    return 'R';
  }
}


class Knight extends Piece {
  targets() {
    let r = parseInt(this.r), c = parseInt(this.c);
    var targets = [];
    if (r > 1) {
      if (c > 0) targets.push([r - 2, c - 1]);
      if (c < 3) targets.push([r - 2, c + 1]);
    }
    if (r < 2) {
      if (c > 0) targets.push([r + 2, c - 1]);
      if (c < 3) targets.push([r + 2, c + 1]);
    }
    if (c > 1) {
      if (r > 0) targets.push([r - 1, c - 2]);
      if (r < 3) targets.push([r + 1, c - 2]);
    }
    if (c < 2) {
      if (r > 0) targets.push([r - 1, c + 2]);
      if (r < 3) targets.push([r + 1, c + 2]);
    }
    return targets;
  }
  get type() {
    return 'N';
  }
}


class Bishop extends Piece {
  targets() {
    let r = parseInt(this.r), c = parseInt(this.c);
    var targets = [];
    for (let i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--)
      targets.push([i, j]);
    for (let i = r + 1, j = c + 1; i <= 3 && j <= 3; i++, j++)
      targets.push([i, j]);
    for (let i = r - 1, j = c + 1; i >= 0 && j <= 3; i--, j++)
      targets.push([i, j]);
    for (let i = r + 1, j = c - 1; i <= 3 && j >= 0; i++, j--)
      targets.push([i, j]);
    return targets;
  }
  get type() {
    return 'B';
  }
}


class King extends Piece {
  targets() {
    let r = parseInt(this.r), c = parseInt(this.c);
    var targets = [];
    if (r > 0) {
      if (c > 0) targets.push([r - 1, c - 1]);
      targets.push([r - 1, c]);
      if (c < 3) targets.push([r - 1, c + 1]);
    }
    if (c > 0) targets.push([r, c - 1]);
    if (c < 3) targets.push([r, c + 1]);
    if (r < 3) {
      if (c > 0) targets.push([r + 1, c - 1]);
      targets.push([r + 1, c]);
      if (c < 3) targets.push([r + 1, c + 1]);
    }
    return targets;
  }
  get type() {
    return 'K';
  }
}


class Queen extends Piece {
  targets() {
    let r = parseInt(this.r), c = parseInt(this.c);
    var targets = [];
    for (let i = r - 1; i >= 0; i--)
      targets.push([i, c]);
    for (let i = r + 1; i <= 3; i++)
      targets.push([i, c]);
    for (let i = c - 1; i >= 0; i--)
      targets.push([r, i]);
    for (let i = c + 1; i <= 3; i++)
      targets.push([r, i]);
    for (let i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--)
      targets.push([i, j]);
    for (let i = r + 1, j = c + 1; i <= 3 && j <= 3; i++, j++)
      targets.push([i, j]);
    for (let i = r - 1, j = c + 1; i >= 0 && j <= 3; i--, j++)
      targets.push([i, j]);
    for (let i = r + 1, j = c - 1; i <= 3 && j >= 0; i++, j--)
      targets.push([i, j]);
    return targets;
  }
  get type() {
    return 'Q';
  }
}
