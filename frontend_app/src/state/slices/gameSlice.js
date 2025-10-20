const initialBoard = () => {
  // Simple 8x8 with basic piece notation. Uppercase = white, lowercase = black.
  // r n b q k b n r / p p p p p p p p / . x6 / ... / P.. / R..
  const empty = Array(8).fill(null).map(() => Array(8).fill(''));
  const setup = [
    ['r','n','b','q','k','b','n','r'],
    ['p','p','p','p','p','p','p','p'],
    ...Array(4).fill(Array(8).fill('')),
    ['P','P','P','P','P','P','P','P'],
    ['R','N','B','Q','K','B','N','R']
  ];
  return setup.map(row => row.slice());
};

export const gameInitialState = {
  board: initialBoard(),
  turn: 'w', // 'w' | 'b'
  selected: null, // { r, c } or null
  moves: [], // history stack [{ from:{r,c}, to:{r,c}, piece, captured }]
};

function inBounds(r,c){ return r>=0 && r<8 && c>=0 && c<8; }

function isWhite(piece) { return piece && piece === piece.toUpperCase(); }
function isBlack(piece) { return piece && piece === piece.toLowerCase(); }

function cloneBoard(board) {
  return board.map(row => row.slice());
}

function basicMoves(board, r, c) {
  // Simplified pseudo-legal moves for pawns, rook, knight, bishop, queen, king.
  const piece = board[r][c];
  if (!piece) return [];
  const moves = [];
  const isW = isWhite(piece);
  const dir = isW ? -1 : 1;

  const pushIf = (nr, nc) => { if (inBounds(nr, nc)) moves.push({ r: nr, c: nc }); };

  const line = (dr, dc) => {
    let nr = r + dr, nc = c + dc;
    while (inBounds(nr, nc)) {
      if (!board[nr][nc]) {
        moves.push({ r: nr, c: nc });
      } else {
        if (isW ? isBlack(board[nr][nc]) : isWhite(board[nr][nc])) {
          moves.push({ r: nr, c: nc });
        }
        break;
      }
      nr += dr; nc += dc;
    }
  };

  const p = piece.toLowerCase();
  if (p === 'p') {
    // forward
    const fr = r + dir;
    if (inBounds(fr, c) && !board[fr][c]) {
      moves.push({ r: fr, c });
      // double move from rank
      const startRank = isW ? 6 : 1;
      const dr2 = r + dir * 2;
      if (r === startRank && !board[dr2][c]) moves.push({ r: dr2, c });
    }
    // captures
    [[dir, -1], [dir, 1]].forEach(([dr, dc]) => {
      const nr = r + dr, nc = c + dc;
      if (inBounds(nr, nc) && board[nr][nc] && (isW ? isBlack(board[nr][nc]) : isWhite(board[nr][nc]))) {
        moves.push({ r: nr, c: nc });
      }
    });
  } else if (p === 'n') {
    [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]].forEach(([dr, dc]) => {
      const nr=r+dr, nc=c+dc;
      if (!inBounds(nr,nc)) return;
      const target = board[nr][nc];
      if (!target || (isW ? isBlack(target) : isWhite(target))) moves.push({ r:nr, c:nc });
    });
  } else if (p === 'b') {
    [[-1,-1],[-1,1],[1,-1],[1,1]].forEach(([dr,dc]) => line(dr, dc));
  } else if (p === 'r') {
    [[-1,0],[1,0],[0,-1],[0,1]].forEach(([dr,dc]) => line(dr, dc));
  } else if (p === 'q') {
    [[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]].forEach(([dr,dc]) => line(dr, dc));
  } else if (p === 'k') {
    [-1,0,1].forEach(dr => {
      [-1,0,1].forEach(dc => {
        if (dr===0 && dc===0) return;
        const nr=r+dr, nc=c+dc;
        if (!inBounds(nr,nc)) return;
        const target=board[nr][nc];
        if (!target || (isW ? isBlack(target) : isWhite(target))) moves.push({ r:nr, c:nc });
      });
    });
  }
  return moves;
}

export function gameReducer(state = gameInitialState, action) {
  switch (action.type) {
    case 'game/select': {
      const { r, c } = action.payload;
      const piece = state.board[r][c];
      if (!piece) return { ...state, selected: null };
      if ((state.turn === 'w' && !isWhite(piece)) || (state.turn === 'b' && !isBlack(piece))) {
        return { ...state, selected: null };
      }
      return { ...state, selected: { r, c } };
    }
    case 'game/move': {
      const { to } = action.payload; // { r, c }
      const from = state.selected;
      if (!from) return state;
      const piece = state.board[from.r][from.c];
      const legal = basicMoves(state.board, from.r, from.c)
        .some(m => m.r === to.r && m.c === to.c);
      if (!legal) return state;

      const board = cloneBoard(state.board);
      const captured = board[to.r][to.c] || '';
      board[to.r][to.c] = piece;
      board[from.r][from.c] = '';
      const nextTurn = state.turn === 'w' ? 'b' : 'w';
      const move = { from, to, piece, captured };
      return { ...state, board, selected: null, turn: nextTurn, moves: [...state.moves, move] };
    }
    case 'game/undo': {
      const last = state.moves[state.moves.length - 1];
      if (!last) return state;
      const board = cloneBoard(state.board);
      board[last.from.r][last.from.c] = last.piece;
      board[last.to.r][last.to.c] = last.captured;
      const prevTurn = state.turn === 'w' ? 'b' : 'w';
      return { ...state, board, selected: null, turn: prevTurn, moves: state.moves.slice(0, -1) };
    }
    case 'game/reset': {
      return { ...gameInitialState, board: initialBoard() };
    }
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function getHints(board, r, c) {
  /** Returns simplified legal move targets for highlighting. */
  return basicMoves(board, r, c);
}
