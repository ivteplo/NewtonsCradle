const { Engine, World, Bodies, Body, Render } = Matter

class Vector {
	constructor(x = 0, y = 0) {
		this.x = x
		this.y = y
	}
}

function distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
