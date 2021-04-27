let ballCount = 1;
let puntos = 0;
let j1;
let j1y = 500;
let j2y = 500;
let gameSpeed = 10;
// let x = [];
// let y = [];
// let size = [];
// const xSpeed = [];
// const ySpeed = [];

// let r = [];
// let g = [];
// let b = [];

class Player{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 100;
        this.g = 255;
        this.b = 0;
        this.sizeX = 20;
        this.sizeY = 90;
        this.cd = 0;
    }
    display() {
        fill(this.r, this.g, this.b);
        rect(this.x, this.y, this.sizeX, this.sizeY);
    }
}

class Puck {
    constructor() {
        this.x = windowWidth/2;
        this.y = windowHeight/2;
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);
        this.size = 40;
        this.xSpeed = random(5,-8);
        this.ySpeed = random(10,-10);
    }

    display() {
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.size);
    }

    collision(player) {
        /*
        let dx = (this.x - other.x);
        let dy = (this.y - other.y);
        let distance = sqrt(dx * dx + yx * yx);*/
        // Player collision
        if (this.cd > 0){
            this.cd--;
        } else {

            if ((this.x - this.size/2 <= player.x + player.sizeX && this.x+this.size/2 >= player.x) && (this.y+this.size/2 >= player.y && this.y-this.size/2 <= player.y + player.sizeY)) {
                const middleY = player.y + (player.sizeY / 2);
                if (this.y < middleY){
                    this.xSpeed *= -1.15;
                    this.ySpeed = -3 * ((middleY - this.y)/(player.sizeY/2));
                    this.cd = 10;
                } else {
                    this.xSpeed *=  -1.15;
                    this.ySpeed = 3 * ((this.y - middleY)/(player.sizeY/2));
                    this.cd = 10;
                }
            }
        }

        // Gol collision
        // let distance = dist(this.x, this.y, other.x, other.y);
        // if (distance < this.size/2 + other.size/2) {
        //     balls.splice(balls.indexOf(this),1);
        //     puntos++;
        //     balls.push(new Puck());
        //     raton.size += log(raton.size*10)/10;
        // }
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if (this.x-this.size/2 < 0) {
            balls.splice(balls.indexOf(this, 1));
            alert("j2 won");
            balls.push(new Puck());
        }
        
        if (this.x+this.size/2 > width) {
            balls.splice(balls.indexOf(this, 1));
            alert("j1 won");
            balls.push(new Puck());
        }

        if (this.y-this.size/2 < 0 || this.y+this.size/2 > height) {
            this.ySpeed *= -1;
        }
        this.display();
    }
}

const balls = [];
const jugadores = [];

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < ballCount; i++) {
        // x[i] = width/2;
        // y[i] = height/2;
        // size[i] = random(10, 50);
        // r[i] = random(255);
        // g[i] = random(255);
        // b[i] = random(255);
        // xSpeed[i] = random(-5, 5);
        // ySpeed[i] = random(-5, 5);
        
        balls.push(new Puck());
    }
    jugadores.push(new Player(100, 500));
    jugadores.push(new Player(windowWidth - 100, 500));

    // raton = new MouseBall();
}

function draw() {
    frameRate(200);
    background(100, 100);
    noStroke();
    textSize(40);
    color(255,0,0);

    if (keyIsDown(87)) {
        if (jugadores[0].y >= 0) {
            jugadores[0].y-=gameSpeed;
        }
    }
    if (keyIsDown(83)) {
        if (jugadores[0].y <= windowHeight - jugadores[0].sizeY) {
            jugadores[0].y+=gameSpeed;
        }
    }

    if (keyIsDown(UP_ARROW)) {
        if (jugadores[1].y >= 0) {
            jugadores[1].y-=gameSpeed;
        }
    }
    if (keyIsDown(DOWN_ARROW)) {
        if (jugadores[1].y <= windowHeight - jugadores[1].sizeY) {
            jugadores[1].y+=gameSpeed;
        }
    }


    for (let i = 0; i < ballCount; i ++) {
        // x[i] = x[i] + xSpeed[i];
        // y[i] += ySpeed[i];

        // if (x[i] < 0 || x[i] > width) {
        //     xSpeed[i] *= -1;
        // }

        // if (y[i] < 0 || y[i] > height) {
        //     ySpeed[i] *= -1;
        // }

        // fill (r[i], g[i], b[i]);
        // ellipse(x[i], y[i], size[i]);
        

        balls[i].move();
        for (jugador of jugadores) {
            balls[i].collision(jugador);
        }
        
        // balls[i].collision(j2);
        
    }
    for (jugador of jugadores) {
        jugador.display();
    }
    // raton.move();
    // raton.display();
}

function windowResized(){
    createCanvas(windowWidth, windowHeight);
}
