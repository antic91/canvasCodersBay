//First canvas c.fillRect
var canvasFillRect = document.getElementById("fillRect");
var cFillRect = canvasFillRect.getContext("2d");

cFillRect.fillRect(232.5, 80, 120, 40);

//Secondcanvas c.rect
var canvasRect = document.getElementById("rect");
var cRect = canvasRect.getContext("2d");

cRect.beginPath();
cRect.rect(232.5, 80, 120, 40);
cRect.stroke();

//Third canvas linie

var canvasLinie = document.getElementById("linie");
var cLinie = canvasLinie.getContext('2d');

cLinie.beginPath();
cLinie.moveTo(200, 100);
cLinie.lineTo(450, 150);
cLinie.lineTo(450, 50);
cLinie.strokeStyle = "red";
cLinie.stroke();


/*Canvas gradient*/

var canvasGr = document.getElementById("gradient");
var cGradient = canvasGr.getContext('2d');

var gradient = cGradient.createLinearGradient(0, 0, 1320, 600);
gradient.addColorStop("0", "magenta");
gradient.addColorStop("0.5", "blue");
gradient.addColorStop("1", "red")



cGradient.beginPath();
cGradient.moveTo(20, 20);
cGradient.lineTo(1300, 580);
cGradient.lineTo(1300, 20);
cGradient.lineTo(20, 580);
cGradient.fillStyle = gradient;
cGradient.fill();



/*Function to get radians**/

function toRad(degrees){
    var partPi = degrees/180;
    return partPi*Math.PI;
}

/*Kurven*/

var canvasKurve = document.getElementById("kurve");
var cK = canvasKurve.getContext('2d');

cK.beginPath();
cK.strokeStyle = "red"
cK.arc(288, 100, 60, toRad(0), toRad(325));
cK.stroke();

cK.beginPath()
cK.strokeStyle = "green";
cK.arc(516, 100, 60, toRad(0), toRad(325));
cK.fill();

cK.beginPath()
cK.strokeStyle = "black";
cK.arc(744, 100, 60, toRad(0), toRad(325));
cK.lineTo(744, 100);
cK.stroke();

cK.beginPath()
cK.strokeStyle = "black";
cK.arc(972, 100, 60, toRad(0), toRad(325));
cK.lineTo(972, 100);
cK.fill();



/*animateCircle canvas*/
var canvasCircle = document.getElementById("animateCircle");
var cCircleCon = canvasCircle.getContext('2d');
var obj = [];
var maxWidth = 1320;
var maxHeight = 400;

function Circle(x, y, r, startAngle, endAngle, vx, vy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.d = 1;
    this.dy = -1;

    this.rgba = {
        r:'25',
        g:'25',
        b: '25',
        a: 1
    }
    if (vx == undefined || vx == 0) {
        vx = 1;
    } if (vy == undefined || vy == 0) {
        vy = 1;
    }


    this.direction = {
        x: vx,
        y: vy
    }

    this.getRGB = function () {
        var str = 'rgba(' + this.rgba.r + "," + this.rgba.g + "," + this.rgba.b + this.rgba.a + ")"
        return str
    }

    this.cordBelongs = function (x,y) {
        var belongsX = Math.abs(this.x - x) < this.r;
        var belongsY = Math.abs(this.y - y) < this.r;

        return belongsX && belongsY;
    }
}

var gr = cCircleCon.createLinearGradient(0, 0, 1320, 400)
gr.addColorStop("0","red")
gr.addColorStop("0.5","blue")
gr.addColorStop("1","yellow")


obj.push(new Circle(60, 80, 40, 0, 320));
obj.push(new Circle(60, 200, 40, 0, 325,2,2));
obj.push(new Circle(60, 320, 40, 0, 325,3,3));
function animate(){
    cCircleCon.clearRect(0,0,1320,280)
    for (var i = 0; i < obj.length; i++){
        var item = obj[i];
        cCircleCon.beginPath();
        cCircleCon.strokeStyle = gradient;
        cCircleCon.arc(item.x, item.y, item.r, toRad(item.startAngle), toRad(item.endAngle))
        cCircleCon.stroke();

        item.startAngle += 5 *item.d;
        item.endAngle += 5 *item.d;
        item.x += item.direction.x *item.d;
        
        if (item.x + item.r + item.direction.x >= maxWidth-20){
            item.d *= -1;
        }
        if (item.x - item.r < 20){
            item.d *= -1;
        }
        
    }
    requestAnimationFrame(animate)
}



var gameCanvas = document.getElementById("animateGame");
var gameCon = gameCanvas.getContext('2d');

var circlesArray = []

function setRgba() {
    var r = Math.floor(Math.random() * (255 - 25 + 1)) + 25;
    var g = Math.floor(Math.random() * (255 - 25 + 1)) + 25;
    var b = Math.floor(Math.random() * (255 - 25 + 1)) + 25;
    return {
        r:r,
        g:g,
        b: b,
        a: 1
    }
}

function setUpGame() {
    circlesArray = [];
    for (var i = 0; i < 50; i++){
        var r = Math.floor(Math.random() * 31) + 10;
        var x = Math.floor(Math.random() * ((1320) - 60 + 1) ) + 40;
        var y = Math.floor(Math.random() * ((800) - 60 + 1)) + 40;
        var vx = Math.floor(Math.random() * 5);
        var vy = Math.floor(Math.random() * 5);
        circlesArray.push(new Circle(x, y, r, 0, 360, vx, vy));
        circlesArray[i].rgba = setRgba();
    }
}

function startAnimation() {
    animate()
}

function gameAnim() {
    gameCon.clearRect(0,0,1320,800)
    for (var i = 0; i < circlesArray.length; i++){
        var item = circlesArray[i];
        gameCon.beginPath();
        gameCon.fillStyle = item.getRGB();
        gameCon.arc(item.x, item.y, item.r, toRad(item.startAngle), toRad(item.endAngle))
        gameCon.fill();
        
        item.startAngle += 5 *item.d;
        item.endAngle += 5 *item.d;
        item.x += item.direction.x * item.d;
        
        item.y += item.direction.y *item.dy;
        
        if (item.x + item.r + item.direction.x >= maxWidth){
            item.d *= -1;
        }
        if (item.y + item.r + item.direction.y >= 800){
            item.dy *= -1;
        }
        if (item.x - item.r - item.direction.x <= 10){
            item.d *= -1;
        }
        if (item.y - item.r - item.direction.y <= 10){
            item.dy *= -1;
        }
        
    }
    requestAnimationFrame(gameAnim)
}

function getMousePos(canvas, evt) {
var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function clicked(event) {
    var position = getMousePos(gameCanvas, event);
    console.log(position)
    for (var i = 0; i < circlesArray.length; i++) {
        if (circlesArray[i].cordBelongs(position.x, position.y)) {
            circlesArray[i].r += 5;
        }
    }
}

function startGame() {
    setUpGame();
    gameAnim();
    document.getElementById("gameButton").disabled = true;
}
