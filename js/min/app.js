var renderer=new PIXI.WebGLRenderer(window.innerWidth,window.innerHeight,{backgroundColor:0,antialias:true});renderer.view.style.position="absolute";renderer.view.style.display="block";document.body.appendChild(renderer.view);function Node(b,d,c){this.speed=d;this.pixi=new PIXI.Graphics();var a=Math.floor((Math.random()*window.innerWidth)+1);var e=Math.floor((Math.random()*window.innerHeight)+1);this.pixi.x=a;this.pixi.y=e;this.pixi.beginFill(c);this.pixi.drawCircle(0,0,b);this.pixi.endFill();this.direction=Math.floor((Math.random()*360)+1);this.move=function(){if(this.pixi.x<-2||this.pixi.y<-2||this.pixi.x>=window.innerWidth+2||this.pixi.y>=window.innerHeight+2){var f=Math.floor((Math.random()*window.innerWidth)+1);var g=Math.floor((Math.random()*window.innerHeight)+1);this.pixi.x=f;this.pixi.y=g}else{this.pixi.x+=Math.sin(this.direction*Math.PI/180)*this.speed;this.pixi.y+=Math.cos(this.direction*Math.PI/180)*this.speed}}}var mouseData={};var stage=new PIXI.Container();stage.interactive=true;var nodes=[];var lines=new PIXI.Graphics();var numberOfNodes=150;var drawLineDistance=150;var mouseLineDistance=150;stage.addChild(lines);var radius=1;var speed=0.3;var color=16777215;for(var i=0;i<numberOfNodes;i++){var node=new Node(radius,speed,color);stage.addChild(node.pixi);nodes.push(node)}function animate(){requestAnimationFrame(animate);lines.clear();for(var b=0;b<=nodes.length-1;b++){nodes[b].move();for(var a=0;a<=nodes.length-1;a++){if(!(nodes[b]==nodes[a])){var c=getDistance(nodes[b].pixi.x,nodes[b].pixi.y,nodes[a].pixi.x,nodes[a].pixi.y);if(c<drawLineDistance){lines.lineStyle(0.5,14737632,((drawLineDistance-c)/c));lines.moveTo(nodes[b].pixi.x,nodes[b].pixi.y);lines.lineTo(nodes[a].pixi.x,nodes[a].pixi.y)}}}var c=getDistance(mouseData.x,mouseData.y,nodes[b].pixi.x,nodes[b].pixi.y);if(c<mouseLineDistance){lines.lineStyle(1,color,((mouseLineDistance-c)/c));lines.moveTo(mouseData.x,mouseData.y);lines.lineTo(nodes[b].pixi.x,nodes[b].pixi.y)}}renderer.render(stage)}animate();function getRandomInt(b,a){return Math.floor(Math.random()*(a-b))+b}function getDistance(d,f,c,e){var b=d-c;var a=f-e;var g=Math.sqrt((b*b)+(a*a));return g}window.addEventListener("resize",resize);function resize(){renderer.resize(window.innerWidth,window.innerHeight)}stage.mousemove=function(){mouseData=renderer.plugins.interaction.mouse.global};