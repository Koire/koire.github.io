
export type pieceType = {
    shape: Array<Array<number>>,
    color: string
}
type piecesType = {
    [key: string]: pieceType
}

const pieces : piecesType = {
	"I": {
		shape: [[1,1,1,1]],
		color: "cyan",
	},
	"O": {
		shape: [[1,1], [1,1]],
		color: "yellow",
		
	},
	"T": {
		shape:[[1,1,1], [0,1,0]],
		color: "purple",
		
	},
	"S": {
		shape: [[0,1,1], [1,1,0]],
		color: "green",
		
	},
	"Z": {
		shape: [[1,1,0], [0,1,1]],
		color: "red"
	},
	"J": { 
		shape: [[0,0,1], [1,1,1]],
		color: "blue",
	},
	"L": {
		shape: [[1,0,0], [1,1,1]],
		color: "orange"
	},
	"P": {
		shape: [[1,1,0], [1,0,1], [1,1,0], [1,0,0]],
		color: "teal"
	},
	"K": {
		shape: [[1,0,1], [1,1,0], [1,0,1]],
		color: "maroon"
	},
	"E": {
		shape: [[1,1,1], [1,0,0], [1,1,1],[1,0,0], [1,1,1]],
		color: "lavender"
	}
}

export const choices = Object.keys(pieces)
const pieceHeight = (piece: tetronimo) => () => piece.shape.length
export const getRandomPiece = () => choices[Math.floor(Math.random()*choices.length)]

const moveCoords = (piece: tetronimo) => (dir = [1,0]) => {
	piece.lastCoords = piece.curCoords
	piece.curCoords = piece.curCoords.map(([row, col, color]) => [
		row + dir[0], col + dir[1], color
	])
}

const rotate = (piece: tetronimo) => (dir = 1) => {
	piece.lastCoords = piece.curCoords
	if (dir === -1) {
		piece.shape = piece.shape.map((val, index) => piece.shape.map(row => row[row.length-1-index]))
	}
	else {
		piece.shape = piece.shape.map((val, index) => piece.shape.map(row => row[index]).reverse())
	}
	piece.move([0,0])
}

export type tetronimo = {
	name: string,
	shape: number[][],
    color: string,
	lastCoords: Array<[number, number, string]>,
	curCoords: Array<[number, number, string]>,
	// eslint-disable-next-line no-unused-vars
	move(dir: number[]): void,
	// eslint-disable-next-line no-unused-vars
	rotate(dir: number): void
}

export const generatePiece = (style: string) => {
	const {shape, color} = pieces[style]
	const coords = shape.flatMap((row, rowNum) => row.map((col, colNum) => [
		-4 + rowNum,
		5 + colNum,
		col === 1 ? color : "black"
	])).toSorted((a, b) => b[0] - a[0])
	let piece = {
		name: style,
		shape,
		color,
		lastCoords: coords,
		curCoords: coords,
		move: () => {},
		rotate: () => {}
	}
	piece.move = moveCoords(piece)
	piece.rotate = rotate(piece)
	return piece
}