import { generatePiece, getRandomPiece } from "./pieces.ts"
import {columns, rows, gridSize, dirs } from "./constants.ts"

const getContext = (boardId: string) => {
	const canvas = <HTMLCanvasElement> document.getElementById(boardId)
	const ctx = canvas.getContext("2d")
	return ctx
}


const generateBoard = (ctx: CanvasRenderingContext2D, rows: number, columns: number, piece) => {
	const board = Array.from({length: rows}, () => Array(columns).fill("black"))
	const drawPiece = (piece, clear = false) => {
		piece.lastCoords.forEach(([row, col]) => {
			if (row < 0) return
			board[row][col] = "black"
		})
		if(!clear){
			piece.curCoords.forEach(([row, col, color]) => {
				if (row < 0) return 
				if (board[row][col] === "black") {
					board[row][col] = color
				}
			})
		}
	}
	return {
		drawBoard: () => board.forEach((row, rowNum) => {
			row.forEach((cell, colNum) => {
				ctx.fillStyle = cell
				ctx.fillRect(colNum * gridSize, rowNum * gridSize, gridSize - 1, gridSize - 1)
			})
		}),
		updateBoard: (move = [0,0]) =>  {
			piece.move(move)
			drawPiece(piece, true)
			const noMove = piece.curCoords.map(([row, col, color]) => {
				if (color === "black") return true
				if (row < 0 && board[0][col] === "black") return true
				if (col >= board[0].length || col <= 0) return false
				if (row >= board.length) return false
				if (row >= 0 && board[row][col] !== "black") return false
				return true
			}).includes(false)
			console.log({noMove})
			drawPiece(piece, false)
			return noMove
		}
	}
}

export const setup = (boardId: string) => {
	const ctx = getContext(boardId)
	if(ctx === null) return
	let gameOver = false
	let currentSpeed = 1000

	ctx.canvas.width = columns * gridSize
	ctx.canvas.height = rows * gridSize
	
	let curPiece = generatePiece(getRandomPiece())
	const {drawBoard, updateBoard} = generateBoard(ctx, rows, columns, curPiece)
	document.addEventListener("keydown", e => {
		
		if(e.key === "ArrowLeft") { updateBoard(dirs.left)}
		if(e.key === "ArrowRight") curPiece.move(dirs.right)
		if(e.key === "ArrowDown") curPiece.move(dirs.down)
		if(e.key === "ArrowUp") curPiece.rotate()
		if(e.key === " ") {curPiece = generatePiece(getRandomPiece())}
	})
	
	
	drawBoard()
	const redraw = () => {
		console.log("moving down")
		const gameOver = updateBoard(dirs.down)
		drawBoard()
		if (!gameOver) setTimeout(redraw, currentSpeed)
	}
	redraw()
	
}

