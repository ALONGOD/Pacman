'use strict'

const PACMAN = '⍩⃝'
var gPacman
var gIsSuper = false
var gDeg = 0

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: { i: 3, j: 5 },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    checkWin()

    // TODO: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log(nextCell)
    // TODO: return if cannot move
    if (nextCell === WALL) return

    // TODO: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (!gIsSuper) {
            var audio = new Audio('audio/lose.mp3');
            audio.play();
            gameOver()
            return
        } else {
            updateScore(5)
            for (var i = 0; i < gGhosts.length; i++) {
                if (gGhosts[i].location.i === nextLocation.i &&
                    gGhosts[i].location.j === nextLocation.j) {
                    // console.log(gGhosts[i])
                    // gDeadGhosts.push(gGhosts.splice(i, 1)[0])
                    gGhosts.splice(i, 1)
                    // console.log(gDeadGhosts)
                    setTimeout(() => gGhosts.push(createGhost()), 5000)
                }

            }
        }
    }
    // TODO: hitting food? call updateScore
    if (nextCell === FOOD) {
        var audio = new Audio('audio/pop.mp3');
        audio.play();
        updateScore(1)
        checkWin()

    }

    if (nextCell === CHERRY) {
        updateScore(10)
        checkWin()
    }

    if (nextCell === SUPER_FOOD) {
        if (gIsSuper) return
        updateScore(5)

        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = 'blue'
        }
        gIsSuper = true
        setTimeout(() => gIsSuper = false, 5000)
        setTimeout(() => {
            for (var i = 0; i < gGhosts.length; i++) {
                gGhosts[i].color = getRandomColor()
            }
        }, 5000)
    }

    // TODO: moving from current location:
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // TODO: update the DOM
    var elFormerCell = document.querySelector(`.cell-${gPacman.location.i}-${gPacman.location.j} `)
    elFormerCell.style.rotate = `0deg`
    renderCell(gPacman.location, EMPTY)

    // TODO: Move the pacman to new location:
    // TODO: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // TODO: update the DOM
    var elGamer = document.querySelector(`.cell-${gPacman.location.i}-${gPacman.location.j} `)
    renderCell(gPacman.location, PACMAN)
    elGamer.style.rotate = `${gDeg}deg`
}

function getNextLocation(eventKeyboard) {
    const nextLocation = { i: gPacman.location.i, j: gPacman.location.j }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            gDeg = 90
            nextLocation.i--
            break;

        case 'ArrowDown':
            gDeg = 270
            nextLocation.i++
            break;

        case 'ArrowLeft':
            gDeg = 0
            nextLocation.j--
            break;

        case 'ArrowRight':
            gDeg = 180
            nextLocation.j++
            break;

        default: return null
    }
    return nextLocation
}