'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const EMPTY = ' '
const SUPER_FOOD = '&#127831;'
const CHERRY = '&#127826'

var gCherryInterval

const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var audio = new Audio('audio/background.mp3');

function init() {
    audio.play();

    clearInterval(gGhostsInterval)
    clearInterval(gCherryInterval)
    gGame.score = 0
    gGhosts = []

    console.log('hello')


    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    gCherryInterval = setInterval(renderCherry, 10000)

    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([]) // board[i] = []

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }

        }
    }
    board[1][8] = SUPER_FOOD
    board[1][1] = SUPER_FOOD
    board[8][1] = SUPER_FOOD
    board[8][8] = SUPER_FOOD
    return board
}

function updateScore(diff) {
    const elScore = document.querySelector('h2 span')

    // Model
    gGame.score += diff
    // DOM
    elScore.innerText = gGame.score
}

function gameOver() {
    gGame.isOn = false
    var elDiv = document.querySelector('.gameOver')
    elDiv.classList.remove('hide')
    audio.pause();
    audio.currentTime = 0
}


function checkWin() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell === FOOD || currCell === SUPER_FOOD || currCell === CHERRY) return
        }
    }
    var elDiv = document.querySelector('.victory')
    elDiv.classList.remove('hide')
    var audio = new Audio('audio/win.mp3');
    audio.play();
    gameOver()
}



function playAgain() {
    var elVictory = document.querySelector('.victory')
    elVictory.classList.add('hide')

    var elDiv = document.querySelector('.gameOver')
    elDiv.classList.add('hide')
    init()
}

// 

// renderCherry(gBoard)
// renderCherry(gBoard)
// renderCherry(gBoard)

function renderCherry() {
    var locations = []
    var counter = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === EMPTY) {
                locations.push({ i, j })
                // console.log(i, j)
            }
        }
    }
    // console.log(locations)

    // console.log(locations)
    var randomLocation = locations[getRandomIntInclusive(0, locations.length - 1)]
    // console.log(randomLocation)
    gBoard[randomLocation.i][randomLocation.j] = CHERRY
    renderCell(randomLocation, CHERRY)


    // setTimeout(() => renderCell(randomLocation, FOOD), 5000)
}
