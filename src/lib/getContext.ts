export const getContext = (boardId: string) => {
	const canvas = <HTMLCanvasElement> document.getElementById(boardId)
	const ctx = canvas.getContext("2d")
	return ctx
}
