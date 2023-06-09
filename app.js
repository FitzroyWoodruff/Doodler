//declaring the class
class Doodle {
	//setting up our constructor
	constructor(container) {
		//creates a canvas element for the page
		this.canvas = document.createElement("canvas");
		//sets our width and height
		this.canvas.width = window.innerWidth * 0.9;
		this.canvas.height = window.innerHeight * 0.75;

		this.color = "#000000";

		// we add the canvas to the body of the page
		container.appendChild(this.canvas);

		// Access our button from the html
		this.undoBtn = document.getElementById("undoBtn");
		this.redBtn = document.getElementById("red");
		this.blueBtn = document.getElementById("blue");
		this.greenBtn = document.getElementById("green");
		this.blackBtn = document.getElementById("black");
		this.greyBtn = document.getElementById("grey");
		// get the 2D context from the canvas
		this.context = this.canvas.getContext("2d");

		//call reset
		this.reset();

		// call the event listener function
		this.#addEventListeners();
	}

	// The reset function creates an empt paths Array, sets is drawing to false amd calls redraw
	reset() {
		this.paths = [];
		this.isDrawing = false;
		this.#redraw();
	}

	// addEventListeners creates listeners events for onmousedown, onmousemove, onmouseup, ontouchstart, ontouchmove, ontouchend and the button
	#addEventListeners() {
		// starts the drawing event
		this.canvas.onmousedown = (event) => {
			const mouse = this.#getMouse(event);
			this.paths.push([mouse]);
			this.isDrawing = true;
		};
		//continues the path of the drawing event
		this.canvas.onmousemove = (event) => {
			if (this.isDrawing) {
				const mouse = this.#getMouse(event);
				const lastPath = this.paths[this.paths.length - 1];
				lastPath.push(mouse);
				this.#redraw();
			}
		};
		//stops drawing the when no longger clicking the mouse
		document.onmouseup = () => {
			this.isDrawing = false;
		};
		// starts the drawing event
		this.canvas.ontouchstart = (event) => {
			const loc = event.touches[0];
			this.canvas.onmousedown(loc);
		};
		//continues the path of the drawing event
		this.canvas.ontouchmove = (event) => {
			const loc = event.touches[0];
			this.canvas.onmousemove(loc);
		};
		//stops drawing the when finger is no longer touching the screen
		document.ontouchend = () => {
			document.onmouseup();
		};
		//when the button is clicked the last path gets popped off of the paths array
		this.undoBtn.onclick = () => {
			this.paths.pop();
			this.#redraw();
		};

		this.redBtn.onclick = () => {
			this.color = "#FF0000";
		};
		this.blueBtn.onclick = () => {
			this.color = "#0000FF";
		};
		this.greenBtn.onclick = () => {
			this.color = "#00FF00";
		};
		this.blackBtn.onclick = () => {
			this.color = "#000000";
		};
		this.greyBtn.onclick = () => {
			this.color = "#555555";
		};
	}

	// redraws or clears the canvas and disables the undo button
	#redraw() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		//calls draw paths from the draw.js file
		draw.paths(this.context, this.paths, this.color);
		if (this.paths.length > 0) {
			this.undoBtn.disabled = false;
		} else {
			this.undoBtn.disabled = true;
		}
	}

	// gets our mouse movements so that the can be stores in the mouse array above
	#getMouse = (event) => {
		const rect = this.canvas.getBoundingClientRect();
		return [
			Math.round(event.clientX - rect.left),
			Math.round(event.clientY - rect.top),
		];
	};
}
