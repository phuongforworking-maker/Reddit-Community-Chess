// Chess Game Logic
class ChessGame {
    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
        this.selectedSquare = null;
        this.moveHistory = [];
        this.capturedPieces = [];
        this.gameStartTime = Date.now();
        this.hintsEnabled = true;
        
        this.initializeUI();
        this.startGameTimer();
    }

    initializeBoard() {
        // Standard chess starting position
        return [
            ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
            ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
            ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
        ];
    }

    initializeUI() {
        this.renderBoard();
        this.updateStatus();
        this.updateStats();
    }

    renderBoard() {
        const boardElement = document.getElementById('chessBoard');
        boardElement.innerHTML = '';

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = row;
                square.dataset.col = col;
                square.textContent = this.board[row][col] || '';
                
                square.addEventListener('click', () => this.handleSquareClick(row, col));
                boardElement.appendChild(square);
            }
        }
    }

    handleSquareClick(row, col) {
        const piece = this.board[row][col];
        
        if (this.selectedSquare) {
            // Try to make a move
            if (this.isValidMove(this.selectedSquare.row, this.selectedSquare.col, row, col)) {
                this.makeMove(this.selectedSquare.row, this.selectedSquare.col, row, col);
                this.clearSelection();
            } else if (piece && this.isPieceOwnedByCurrentPlayer(piece)) {
                // Select different piece
                this.selectSquare(row, col);
            } else {
                this.clearSelection();
            }
        } else if (piece && this.isPieceOwnedByCurrentPlayer(piece)) {
            // Select a piece
            this.selectSquare(row, col);
        }
    }

    selectSquare(row, col) {
        this.selectedSquare = { row, col };
        this.highlightSquares();
    }

    clearSelection() {
        this.selectedSquare = null;
        this.clearHighlights();
    }

    highlightSquares() {
        this.clearHighlights();
        
        if (!this.selectedSquare) return;
        
        // Highlight selected square
        const selectedElement = document.querySelector(`[data-row="${this.selectedSquare.row}"][data-col="${this.selectedSquare.col}"]`);
        selectedElement.classList.add('selected');
        
        // Highlight possible moves if hints are enabled
        if (this.hintsEnabled) {
            const possibleMoves = this.getPossibleMoves(this.selectedSquare.row, this.selectedSquare.col);
            possibleMoves.forEach(move => {
                const element = document.querySelector(`[data-row="${move.row}"][data-col="${move.col}"]`);
                element.classList.add('possible-move');
            });
        }
    }

    clearHighlights() {
        document.querySelectorAll('.square').forEach(square => {
            square.classList.remove('selected', 'possible-move');
        });
    }

    isPieceOwnedByCurrentPlayer(piece) {
        const whitePieces = ['♔', '♕', '♖', '♗', '♘', '♙'];
        const blackPieces = ['♚', '♛', '♜', '♝', '♞', '♟'];
        
        if (this.currentPlayer === 'white') {
            return whitePieces.includes(piece);
        } else {
            return blackPieces.includes(piece);
        }
    }

    isValidMove(fromRow, fromCol, toRow, toCol) {
        // Basic bounds check
        if (toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) return false;
        
        const piece = this.board[fromRow][fromCol];
        const targetPiece = this.board[toRow][toCol];
        
        // Can't capture own piece
        if (targetPiece && this.isPieceOwnedByCurrentPlayer(targetPiece)) return false;
        
        // Basic piece movement validation (simplified)
        return this.isValidPieceMove(piece, fromRow, fromCol, toRow, toCol);
    }

    isValidPieceMove(piece, fromRow, fromCol, toRow, toCol) {
        const rowDiff = toRow - fromRow;
        const colDiff = toCol - fromCol;
        const absRowDiff = Math.abs(rowDiff);
        const absColDiff = Math.abs(colDiff);
        
        switch (piece) {
            case '♙': // White pawn
                if (colDiff === 0) {
                    if (rowDiff === -1 && !this.board[toRow][toCol]) return true;
                    if (fromRow === 6 && rowDiff === -2 && !this.board[toRow][toCol]) return true;
                } else if (absColDiff === 1 && rowDiff === -1 && this.board[toRow][toCol]) {
                    return true;
                }
                return false;
                
            case '♟': // Black pawn
                if (colDiff === 0) {
                    if (rowDiff === 1 && !this.board[toRow][toCol]) return true;
                    if (fromRow === 1 && rowDiff === 2 && !this.board[toRow][toCol]) return true;
                } else if (absColDiff === 1 && rowDiff === 1 && this.board[toRow][toCol]) {
                    return true;
                }
                return false;
                
            case '♖': case '♜': // Rook
                if (rowDiff === 0 || colDiff === 0) {
                    return this.isPathClear(fromRow, fromCol, toRow, toCol);
                }
                return false;
                
            case '♗': case '♝': // Bishop
                if (absRowDiff === absColDiff) {
                    return this.isPathClear(fromRow, fromCol, toRow, toCol);
                }
                return false;
                
            case '♕': case '♛': // Queen
                if (rowDiff === 0 || colDiff === 0 || absRowDiff === absColDiff) {
                    return this.isPathClear(fromRow, fromCol, toRow, toCol);
                }
                return false;
                
            case '♔': case '♚': // King
                return absRowDiff <= 1 && absColDiff <= 1;
                
            case '♘': case '♞': // Knight
                return (absRowDiff === 2 && absColDiff === 1) || (absRowDiff === 1 && absColDiff === 2);
                
            default:
                return false;
        }
    }

    isPathClear(fromRow, fromCol, toRow, toCol) {
        const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
        const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;
        
        let currentRow = fromRow + rowStep;
        let currentCol = fromCol + colStep;
        
        while (currentRow !== toRow || currentCol !== toCol) {
            if (this.board[currentRow][currentCol]) return false;
            currentRow += rowStep;
            currentCol += colStep;
        }
        
        return true;
    }

    getPossibleMoves(row, col) {
        const moves = [];
        
        for (let toRow = 0; toRow < 8; toRow++) {
            for (let toCol = 0; toCol < 8; toCol++) {
                if (this.isValidMove(row, col, toRow, toCol)) {
                    moves.push({ row: toRow, col: toCol });
                }
            }
        }
        
        return moves;
    }

    makeMove(fromRow, fromCol, toRow, toCol) {
        const piece = this.board[fromRow][fromCol];
        const capturedPiece = this.board[toRow][toCol];
        
        // Record move
        const moveNotation = this.getMoveNotation(piece, fromRow, fromCol, toRow, toCol, capturedPiece);
        this.moveHistory.push({
            from: { row: fromRow, col: fromCol },
            to: { row: toRow, col: toCol },
            piece,
            captured: capturedPiece,
            notation: moveNotation
        });
        
        // Handle capture
        if (capturedPiece) {
            this.capturedPieces.push(capturedPiece);
        }
        
        // Make the move
        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;
        
        // Switch players
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        
        // Update UI
        this.renderBoard();
        this.updateStatus();
        this.updateStats();
        this.updateMoveHistory();
    }

    getMoveNotation(piece, fromRow, fromCol, toRow, toCol, captured) {
        const files = 'abcdefgh';
        const fromSquare = files[fromCol] + (8 - fromRow);
        const toSquare = files[toCol] + (8 - toRow);
        const captureSymbol = captured ? 'x' : '';
        
        return `${piece}${fromSquare}${captureSymbol}${toSquare}`;
    }

    updateStatus() {
        const statusElement = document.getElementById('gameStatus');
        const playerName = this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1);
        
        statusElement.textContent = `${playerName}'s Turn - Select a piece to move`;
        statusElement.className = `status ${this.currentPlayer}-turn`;
    }

    updateStats() {
        document.getElementById('moveCount').textContent = this.moveHistory.length;
        document.getElementById('capturedCount').textContent = this.capturedPieces.length;
    }

    updateMoveHistory() {
        const historyElement = document.getElementById('moveHistory');
        const recentMoves = this.moveHistory.slice(-10);
        
        historyElement.innerHTML = recentMoves.map((move, index) => 
            `${this.moveHistory.length - recentMoves.length + index + 1}. ${move.notation}`
        ).join('<br>') || 'Game started. White to move.';
        
        historyElement.scrollTop = historyElement.scrollHeight;
    }

    startGameTimer() {
        setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.gameStartTime) / 1000);
            const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
            const seconds = (elapsed % 60).toString().padStart(2, '0');
            document.getElementById('gameTime').textContent = `${minutes}:${seconds}`;
        }, 1000);
    }
}

// Global game instance
let game;

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    game = new ChessGame();
});

// Game control functions
function newGame() {
    game = new ChessGame();
}

function undoMove() {
    if (game.moveHistory.length === 0) return;
    
    const lastMove = game.moveHistory.pop();
    
    // Restore the piece
    game.board[lastMove.from.row][lastMove.from.col] = lastMove.piece;
    game.board[lastMove.to.row][lastMove.to.col] = lastMove.captured;
    
    // Remove from captured pieces if there was a capture
    if (lastMove.captured) {
        const capturedIndex = game.capturedPieces.lastIndexOf(lastMove.captured);
        if (capturedIndex > -1) {
            game.capturedPieces.splice(capturedIndex, 1);
        }
    }
    
    // Switch back to previous player
    game.currentPlayer = game.currentPlayer === 'white' ? 'black' : 'white';
    
    // Clear selection and update UI
    game.clearSelection();
    game.renderBoard();
    game.updateStatus();
    game.updateStats();
    game.updateMoveHistory();
}

function toggleHints() {
    game.hintsEnabled = !game.hintsEnabled;
    const button = event.target;
    button.textContent = game.hintsEnabled ? '💡 Toggle Hints' : '🔍 Toggle Hints';
    
    // Re-highlight if there's a selection
    if (game.selectedSquare) {
        game.highlightSquares();
    }
}
