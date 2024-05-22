drops = []
function setup() {
    initP5(true)
    initPaper(false)
    noStroke()
    colorMode(HSB)
}

function draw() {
    if (mouseIsPressed) {
        background(255)
        new Drop(mouseX, mouseY)
        blendMode(DIFFERENCE)
        drops.forEach(drop => drop.show())
        blendMode(BLEND)
    }
}

function mouseReleased(){
    makeSVG()
}

drops = []
class Drop {
    constructor(x, y) {
        this.center = p(x, y)
        this.r = random(10, 40)
        this.color = color('white')
        // this.color = color(random(255), random(255), random(255))
        // this.color = color(random(0,150), 70, 100)
        if (random()<.05) this.color = color('black')
            
        this.points = []
        for (let a = 0; a < 360; a += 1)
            this.points.push(pointFromAngle(a, this.r).add(this.center))
        drops.forEach(drop => drop.marbleBy(this))
        this.index = drops.length
        this.age = 0
        drops.push(this)
    }

    marbleBy(drop) {
        this.points = this.points.map(P => {
            const C = drop.center
            const diff = P.getDistance(C)
            const r = drop.r
            return C.add(P.subtract(C).multiply(sqrt(1 + r * r / (diff * diff))))
        })
        this.rebuild()
    }

    rebuild() {
        let shouldRebuild = false
        const newPoints = []
        for (let i = 0; i < this.points.length; i++) {
            const p1 = this.points[i]
            const p2 = this.points[(i + 1) % this.points.length]
            newPoints.push(p1)
            if (p1.getDistance(p2) > 10) {
                newPoints.push(p1.add(p2).divide(2))
                shouldRebuild = true
            }
        }
        this.points = newPoints
        if (shouldRebuild) this.rebuild()
    }

    show() {
        if (this.age++ > 500) {
            drops.splice(this.index, 1)
            return
        }

        fill(this.color)
        beginShape()
        this.points.forEach(point => {
            vertex(point.x, point.y)
        })
        endShape(CLOSE)
    }
}

function keyPressed() {
    if (key == 's') saveSVG()
}

svg = null
function makeSVG() {
    if (!svg) {
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.setAttribute("width", width)
        svg.setAttribute("height", height)
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
    }
    while (svg.lastChild) svg.removeChild(svg.lastChild)

    drops.forEach(drop => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
        path.setAttribute("fill", "none")
        path.setAttribute("stroke", "black")
        path.setAttribute("d", `M${drop.points.map(p => `${p.x},${p.y}`).join("L")}Z`)
        svg.appendChild(path)
    })

    document.body.appendChild(svg)
}

function saveSVG() {
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.download = 'coolcool.svg'
    a.href = 'data:image/svg+xml,' + svg.outerHTML
    a.click()
    document.body.removeChild(a)
}