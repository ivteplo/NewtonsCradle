var engine
var world
var cradle

function setup() {
	engine = Engine.create()
	world = engine.world

	cradle = new NewtonsCradle({
		center: new Vector(windowWidth / 2, Math.max(windowWidth / 20, 25)),
		pendulumCount: 5,
		world
	})

	createCanvas(windowWidth, windowHeight)
	angleMode(DEGREES)

	Engine.run(engine)
}

function draw() {
	resizeCanvas(windowWidth, windowHeight)
	background(0)

	Engine.update(engine)

	cradle.update()
	cradle.draw()
}

function mousePressed() {
	cradle.onMouseDown()
}

function mouseReleased() {
	cradle.onMouseUp()
}
