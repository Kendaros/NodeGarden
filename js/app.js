var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight,{backgroundColor : 0x000000, antialias: true});
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
    this.pixi.alpha = 0;

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
            this.pixi.alpha = 0;
        }
        else if(this.pixi.alpha > 1) {
            this.pixi.x += Math.sin(this.direction * Math.PI / 180) * this.speed;
            this.pixi.y += Math.cos(this.direction * Math.PI / 180) * this.speed;
        }
        else {
            this.pixi.x += Math.sin(this.direction * Math.PI / 180) * this.speed;
            this.pixi.y += Math.cos(this.direction * Math.PI / 180) * this.speed;
            this.pixi.alpha += 0.01;
        }
    };

}

var stage = new PIXI.Container();
var nodesNumber = 500;
var nodes = [];

var lines = new PIXI.Graphics();
var drawLineDistance = 100;

stage.addChild(lines);



for(var i = 0; i < nodesNumber; i++) {

    var radius = 0.5;
    var speed = 1;
    var color = 0xFFFFFF;

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
                var dx = nodes[i].pixi.x - nodes[j].pixi.x;
                var dy = nodes[i].pixi.y - nodes[j].pixi.y;
                var distance = Math.sqrt(( dx * dx ) + ( dy * dy ));


                if (distance < drawLineDistance) {
                    //nodes[i].pixi.speed = nodes[i].pixi.speed + distance;
                    lines.lineStyle(0.5, 0xFFFFFF , ((drawLineDistance - distance) / distance)); //0xB9B4B8
                    lines.moveTo(nodes[i].pixi.x, nodes[i].pixi.y);
                    lines.lineTo(nodes[j].pixi.x, nodes[j].pixi.y);
                }
            }

        }
    }

    renderer.render(stage);
}


animate();


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

window.addEventListener('resize', resize);

function resize() {
    renderer.resize(window.innerWidth, window.innerHeight);
}



mySprite.mousemove = function(mouseData)
{
    // this line will get the mouse coords relative to the sprites..
    var localCoordsPosition = mouseData.getLocalPosition(mySprite);

    // this line will get the mouse coords relative to the sprites parent..
    var parentCoordsPosition = mouseData.getLocalPosition(mySprite.parent);

    this.position.x = parentCoordsPosition.x;
    this.position.y = parentCoordsPosition.y;
}

mySprite.mousemove = function(mouseData)
{
    // this line will get the mouse coords relative to the sprites..
    var localCoordsPosition = mouseData.getLocalPosition(mySprite);

    // this line will get the mouse coords relative to the sprites parent..
    var parentCoordsPosition = mouseData.getLocalPosition(mySprite.parent);

    this.position.x = parentCoordsPosition.x;
    this.position.y = parentCoordsPosition.y;
}