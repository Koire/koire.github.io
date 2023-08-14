import { sharpImageService } from "astro/config"
import { gridSize, rows, columns } from "./constants"
export const dirs = {
    left : [-1,0],
    right : [1,0],
    down : [0,1]
}
type piecesType = {
    [key: string]: {
        shape: Array<Array<number>>,
        color: string
    }
}

const pieces : piecesType = {
    "I": {
        shape: [[1,1,1,1]],
        color: 'cyan'
    },
    "O": {
        shape: [[1,1], [1,1]],
        color: 'yellow'
    },
    "T": {
        shape:[[1,1,1], [0,1,0]],
        color: 'purple'
    },
    "S": {
        shape: [[0,1,1], [1,1,0]],
        color: 'green'
    },
    "Z": {
        shape: [[1,1,0], [0,1,1]],
        color: 'red'
    },
    "J": { 
        shape: [[0,0,1], [1,1,1]],
        color: 'blue',
    },
    "L": {
        shape: [[1,0,0], [1,1,1]],
        color: 'orange'
    },
    "P": {
        shape: [[1,1,0], [1,0,1], [1,1,0], [1,0,0]],
        color: 'teal'
    },
    "K": {
        shape: [[1,0,1], [1,1,0], [1,0,1]],
        color: 'maroon'
    },
    "E": {
        shape: [[1,1,1], [1,0,0], [1,1,1],[1,0,0], [1,1,1]],
        color: 'lavender'
    }
}

export const choices = Object.keys(pieces)
export const getRandomPiece = () => choices[Math.floor(Math.random()*choices.length)]

type piece = {
    shape: Array<Array<number>>,
    color: string
}




export const generatePiece = (style: string, ctx: any) => {
    let piece = pieces[style]
    let curPos = [5,-4]
    let canMove = true

    const draw = (fill = true) => {
        ctx.fillStyle = piece.color
        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {

                if (piece.shape[row][col]) {
                    if (fill) {
                        ctx.fillRect((curPos[0] + col) * gridSize, (curPos[1] + row) * gridSize, gridSize - 1, gridSize - 1);
                    }
                    else {
                        ctx.clearRect((curPos[0] + col) * gridSize, (curPos[1] + row) * gridSize, gridSize - 1, gridSize - 1)
                    }
                }
            }
        }
    }

    const rotate = (dir = 1) => {
        draw(false)
        if (dir === -1) {
            piece.shape =  piece.shape[0].map((val, index) => piece.shape.map(row => row[row.length-1-index]));
        }
        piece.shape = piece.shape[0].map((val, index) => piece.shape.map(row => row[index]).reverse())
        draw()
    }

    const move = (dir = [0,1]) => {
        const newVerticalPos = curPos[1] + dir[1]
        const newHorizontalPos = curPos[0] + dir[0]
        const pieceWidth = Math.max(...piece.shape.map(row => row.length - 1))
        if(newVerticalPos + piece.shape.length -1 >= rows) 
        {
            canMove = false
        }
        if(pieceWidth + newHorizontalPos >= columns || newHorizontalPos < 0) return 
        if(canMove) {
            draw(false)  
            curPos = [newHorizontalPos, newVerticalPos]
            draw()
        }
    }


    return {
        curPos,
        rotate,
        draw,
        move,
        delete: () => draw(false)
    }
}