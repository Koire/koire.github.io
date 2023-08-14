import { generatePiece, dirs, getRandomPiece } from "./pieces.ts"
import {columns, rows, gridSize } from "./constants.ts"

const getContext = (boardId: string) => {
	const canvas = <HTMLCanvasElement> document.getElementById(boardId)
	const ctx = canvas.getContext("2d")
	return ctx
}

export const setup = (boardId: string) => {
	const ctx = getContext(boardId)
	if(ctx === null) return

    const board = Array.from({length: rows}, () => Array(columns).fill(0))
	ctx.canvas.width = columns * gridSize
	ctx.canvas.height = rows * gridSize
	
	let curPiece = generatePiece(getRandomPiece(), ctx)
	curPiece.draw()
	document.addEventListener('keydown', e => {
		if(e.key === "ArrowLeft") {
			curPiece.move(dirs.left)
		}
		if(e.key === "ArrowRight") {
			curPiece.move(dirs.right)
		}
		if(e.key === "ArrowDown") {
			curPiece.move(dirs.down)
		}
		if(e.key === "ArrowUp") curPiece.rotate()
		if(e.key === " ") {
			//curPiece.delete()
			curPiece = generatePiece(getRandomPiece(), ctx)
			curPiece.draw()
		}
	})
	setInterval(() => {
		curPiece.move()
	}, 500)
    return {
        board
    }
}

