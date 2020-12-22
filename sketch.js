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
	background(230)

	Engine.update(engine)

	cradle.update()
	cradle.draw()

	fill("black")
	textAlign(LEFT)
	textSize(15)
	text("Автор: Задворнов Іван", 5, 20)
}

function mousePressed() {
	cradle.onMouseDown()
}

function mouseReleased() {
	cradle.onMouseUp()
}
