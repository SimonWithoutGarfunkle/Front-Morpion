let currentPlayer = 'X';

function tileClicked(tile) {
    if (!tile.innerText) {
        tile.innerText = currentPlayer;
        tile.classList.add('rotate');
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}
