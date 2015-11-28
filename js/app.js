var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight,{backgroundColor : 0x000000, antialias: true});
renderer.view.style.position = 'absolute';
renderer.view.style.display = 'block';
document.body.appendChild(renderer.view);

function Node(radius, speed, color) {

    this.speed = speed;
    this.pixi = new PIXI.Graphics();

    var x = Math.floor((Math.random() * window.innerWidth) + 1);
    var y = Math.floor((Math.random() * window.innerHeight) + 1);

    this.pixi.x = x;
    this.pixi.y = y;
    //this.pixi.alpha = 1;

    this.pixi.beginFill(color);
    this.pixi.drawCircle(0, 0, radius);
    this.pixi.endFill();

    this.direction = Math.floor((Math.random() * 360) + 1);

    this.move = function(){

        if(this.pixi.x < -2 || this.pixi.y < -2 || this.pixi.x >= window.innerWidth +2 || this.pixi.y >= window.innerHeight +2) {
            var x = Math.floor((Math.random() * window.innerWidth) + 1);
            var y = Math.floor((Math.random() * window.innerHeight) + 1);

            this.pixi.x = x;
            this.pixi.y = y;
            //this.pixi.alpha = 0;
        }
        //else if(this.pixi.alpha > 1) {
        //    this.pixi.x += Math.sin(this.direction * Math.PI / 180) * this.speed;
        //    this.pixi.y += Math.cos(this.direction * Math.PI / 180) * this.speed;
        //}
        else {
            this.pixi.x += Math.sin(this.direction * Math.PI / 180) * this.speed;
            this.pixi.y += Math.cos(this.direction * Math.PI / 180) * this.speed;
        //    this.pixi.alpha += 0.01;
        }
    };

}

var mouseData = {};
var stage = new PIXI.Container();
stage.interactive = true;
var nodes = [];

var lines = new PIXI.Graphics();
var numberOfNodes = 150;
var drawLineDistance = 150;
var mouseLineDistance = 150;

stage.addChild(lines);

var radius = 1;
var speed = 0.3;
var color = 0xFFFFFF;

for(var i = 0; i < numberOfNodes; i++) {

    var node = new Node(radius, speed, color);

    stage.addChild(node.pixi);

    nodes.push(node);
}

function animate(){
    requestAnimationFrame(animate);

    lines.clear();

    for (var i = 0; i <= nodes.length - 1; i++) {
        nodes[i].move();

        for (var j = 0; j <= nodes.length - 1; j++) {

            if(!(nodes[i] == nodes[j])) {

                var distance = getDistance(nodes[i].pixi.x, nodes[i].pixi.y, nodes[j].pixi.x, nodes[j].pixi.y);

                if (distance < drawLineDistance) {
                    lines.lineStyle(0.5, 0xe0e0e0 , ((drawLineDistance - distance) / distance));
                    lines.moveTo(nodes[i].pixi.x, nodes[i].pixi.y);
                    lines.lineTo(nodes[j].pixi.x, nodes[j].pixi.y);
                }
            }

        }

        var distance = getDistance(mouseData.x, mouseData.y, nodes[i].pixi.x, nodes[i].pixi.y);

        if (distance < mouseLineDistance) {
            lines.lineStyle(1, color, ((mouseLineDistance - distance) / distance)); //0xB9B4B8
            lines.moveTo(mouseData.x, mouseData.y);
            lines.lineTo(nodes[i].pixi.x, nodes[i].pixi.y);
        }

    }

    renderer.render(stage);
}


animate();


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getDistance(x1, y1, x2, y2){
    var dx = x1 - x2;
    var dy = y1 - y2;
    var distance = Math.sqrt(( dx * dx ) + ( dy * dy ));

    return distance;
}

window.addEventListener('resize', resize);

function resize() {
    renderer.resize(window.innerWidth, window.innerHeight);
}



stage.mousemove = function()
{
    mouseData = renderer.plugins.interaction.mouse.global;
}