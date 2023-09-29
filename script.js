


var canvas = document.createElement('canvas');
canvas.id = "canvas";
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");
var w = window.innerWidth;
var h = window.innerHeight;
canvas.width = w;
canvas.height = h;
var stars = [];
var num_stars = 1000;
var maxZ = 200;
var originX = w / 2;
var originY = h / 2;

var Star = function () {
    this.x = w * Math.random();
    this.y = h * Math.random();
    this.z = maxZ * Math.random();
    this.accX = 0;
    this.accY = 0;
    this.c = Math.floor(Math.random() * 128) + 128;
    this.color = "rgb(" + this.c + "," + this.c + "," + this.c + ")";
}

Star.prototype.GetColorMagnitude = function () {
    var m = 1 - (this.z / maxZ);
    var r = Math.ceil(this.c * m);
    return "rgb(" + r + "," + r + "," + r + ")";
}

Star.prototype.Draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 2, 2);
}

Star.prototype.Update = function (ctx) {
    if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
        this.z = maxZ;
        this.accX = 0;
        this.accY = 0;
        this.x = w * Math.random();
        this.y = h * Math.random();
    }
    var dx = (this.x - originX) / 1000;
    var dy = (this.y - originY) / 1000;
    this.accX += dx / dy;
    this.accY += dy / dx;
    this.x += dx;
    this.y += dy;
    this.z -= (Math.abs(dx) + Math.abs(dy));
    if (this.z < 0)
        this.z = 0;
    this.color = this.GetColorMagnitude();
}

canvas.addEventListener("mousemove", function (e) {
    originX = e.clientX;
    originY = e.clientY;
});

function loop() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < num_stars; i++) {
        stars[i].Draw(ctx);
        stars[i].Update();
    }
    requestAnimationFrame(loop);
}

//Create stars
for (var i = 0; i < num_stars; i++)
    stars.push(new Star());
loop();

const sun = document.getElementById('toggleSun');
sun.addEventListener('click', function() {
    sun.classList.toggle('show-sun');
});
