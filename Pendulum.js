class Pendulum {
	static ballRadius = 30

	constructor({ origin, stringLength, startingAngle = 0, roof, world } = {}) {
		this.origin = origin
		this.stringLength = stringLength
		this.isClicked = false

		const startX = stringLength * Math.sin(startingAngle) + origin.x
		const startY = stringLength * Math.cos(startingAngle) + origin.y

		this.ball = Bodies.circle(startX, startY, Pendulum.ballRadius, {
            isStatic: false,
            restitution: 1,
            friction: 0,
            density: 10,
        })

		this.rope = Matter.Constraint.create({
			bodyA: this.ball,
			bodyB: roof,
			pointB: {
				x: origin.x - roof.position.x,
				y: origin.y - roof.position.y
			},
			length: stringLength
		})

		World.add(world, this.ball)
		World.add(world, this.rope)
	}

	get angle() {
		return Math.atan2(this.ball.position.y - this.origin.y, this.ball.position.x - this.origin.x) - Math.PI / 2
	}

	draw() {
		stroke("#444")
		strokeWeight(3)

		const { x: ballX, y: ballY } = this.ball.position
		const originX = this.rope.bodyB.position.x + this.rope.pointB.x
		const originY = this.rope.bodyB.position.y + this.rope.pointB.y
		
		line(originX, originY, ballX, ballY)

		noStroke()
		fill("rgb(56, 68, 240)")
		ellipse(ballX, ballY, Pendulum.ballRadius * 2, Pendulum.ballRadius * 2)
	}

	update() {
		this.onDrag()
	}

	onMouseDown() {
		if (distance(this.ball.position.x, this.ball.position.y, mouseX, mouseY) <= Pendulum.ballRadius) {
			this.isClicked = true
		}
	}

	onDrag() {
		if (this.isClicked) {
			const difference = new Vector(this.origin.x - mouseX, this.origin.y - mouseY)
			const newAngle = Math.atan2(-1 * difference.y, difference.x) - Math.PI / 2
			const position = new Vector(
				this.stringLength * Math.sin(newAngle) + this.origin.x,
				this.stringLength * Math.cos(newAngle) + this.origin.y
			)

			Body.setPosition(this.ball, position)
		}
	}
	
	onMouseUp() {
		this.isClicked = false
	}
}
