let finalImage
function finishImage() {
    finalImage = get()
    // windowResized()
}

// function windowResized() {
//     if (!finalImage) finalImage = get()
//     resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
//     resetMatrix()
//     image(finalImage, 0, 0, width, height)
// }

function preload() {
    if (typeof preloadShader === "function") preloadShader()
    if (typeof preloadFont === "function") preloadFont()
    if (typeof preloadImage === "function") preloadImage()
}


const v = (x, y, z) => createVector(x, y, z)
const p = (x, y) => new paper.Point(x, y)
const vdist = (a, b) => p5.Vector.dist(a, b)

const randomRange = (range) => random(range[0], range[1])
const round_random = (a = 1, b = 0) => Math.floor(random(a, b + 1))
const choose = (arr) => arr[Math.floor(random(arr.length))]
const repeat = (n, func) => { for(let i = 0; i < n; i++) func(i) }


Array.prototype.pushArray = function pushArray(arr) {
    arr.forEach(element => this.push(element));
}
Array.prototype.get = function get(i) {
    return this[i % this.length]
}
Array.prototype.rotateShape = function rotateShape(a) {
    const sumToRotate = this.length * a / 360
    for (let i = 0; i < sumToRotate; i++) this.push(this.shift())
    return this
}
function applyRemove(func) {
    push()
    noStroke()
    fill(0)
    blendMode(REMOVE)
    func()
    pop()
}

