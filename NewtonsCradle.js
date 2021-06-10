class NewtonsCradle {
	constructor({ pendulumCount = 5, center, world }) {
		this.pendulums = []
		this.roofWidth = pendulumCount * Pendulum.ballRadius * 2
		this.roofHeight = 30
		this.roof = Bodies.rectangle(
			-(pendulumCount / 2) * Pendulum.ballRadius * 2 + center.x,
			center.y,
			this.roofWidth,
			this.roofHeight,
			{ isStatic: true }
		)

		World.add(world, this.roof)

		for (let i = 0; i < pendulumCount; i += 1) {
			this.pendulums.push(new Pendulum({
				id: i,
				origin: new Vector((i - Math.floor(pendulumCount / 2)) * Pendulum.ballRadius * 2 + center.x, center.y + this.roofHeight / 2),
				stringLength: 200,
				world,
				roof: this.roof
			}))
		}
	}

	draw() {
		noStroke()
		fill("#444")
		rect(this.roof.position.x, this.roof.position.y, this.roofWidth, this.roofHeight)

		this.pendulums.forEach(pendulum => {
			pendulum.draw()
		})
	}

	update() {
		const alreadyUpdated = {}
		this.pendulums.forEach((pendulum, index) => {
			pendulum.update()
		})
	}

	onMouseDown() {
		this.pendulums.forEach(pendulum => {
			pendulum.onMouseDown()
		})
	}

	onMouseUp() {
		this.pendulums.forEach(pendulum => {
			pendulum.onMouseUp()
		})
	}
}
