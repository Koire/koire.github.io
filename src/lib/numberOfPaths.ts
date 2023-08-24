import { getContext } from "./getContext"
import { gridSize } from "./tetris/constants"



const generatePaths = (rows: number, cols: number, pathCount: HTMLElement, ctx: CanvasRenderingContext2D) => {
	function calculatePaths(row: number, col: number, timeout = 10) {
		setTimeout( () => {
			ctx.fillStyle = "red"
			ctx.fillRect(col * gridSize, row * gridSize, gridSize - 1, gridSize - 1)
		}, timeout * 100)
		if (row === rows-1 && col === cols-1) {
			pathCount.textContent = parseInt(pathCount.textContent) + 1
			return [row, col]
		}
		if( row < rows) calculatePaths(row + 1, col, timeout + 1)
		if( col < cols) calculatePaths(row, col + 1, timeout + 1)
		setTimeout(() => {
			ctx.fillStyle = "black"
			ctx.fillRect(col * gridSize, row * gridSize, gridSize - 1, gridSize - 1)
		}, (timeout+2) * 100)
	}
	return calculatePaths(0,0)
}

const setup = () => {
	const cols = <HTMLInputElement> document.getElementById("cols")
	const rows = <HTMLInputElement> document.getElementById("rows")
	const submit = document.getElementById("start")
	const pathCount = document.getElementById("pathCount")
	const ctx = getContext("board")
	if (!cols || !rows || !submit || !pathCount || !ctx) return
    
	submit.addEventListener("click", () => {
		ctx.canvas.width = parseInt(cols.value) * gridSize
		ctx.canvas.height = parseInt(rows.value) * gridSize
		pathCount.textContent = "0"
		const paths = generatePaths(parseInt(rows.value), parseInt(cols.value), pathCount, ctx)
		console.log(paths)
	})
}
    


export const start = () => {
	setup()
}