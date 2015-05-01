if(!Detector.webgl) Detector.addGetWebGLMessage();

var innerWidth = 960;
var innerHeight = 480;

var container;

var camera, scene, renderer, effect;

var mesh, geometry;
var mouseX = 0, mouseY = 0;

function init() {

	container = document.getElementById('canvas_container');

	camera = new THREE.PerspectiveCamera( 100, innerWidth / innerHeight, 1, 100000 );
	camera.position.z = 0;
	camera.position.y = 90;
	camera.rotation.y = Math.PI/2;
	camera.position.x = -1500;

	scene = new THREE.Scene();

	////////////////
	//// SKYBOX ////
	////////////////
	var urls = [
		"/skybox/sky.png","/skybox/sky.png","/skybox/sky.png",
		"/skybox/sky.png","/skybox/sky.png","/skybox/sky.png"
	];
	var textureCube = THREE.ImageUtils.loadTextureCube( urls, THREE.CubeRefractionMapping );
	var shader = THREE.ShaderLib[ "cube" ];
	shader.uniforms[ "tCube" ].value = textureCube;
	var material = new THREE.ShaderMaterial( {
		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		side: THREE.BackSide
	}),
	mesh = new THREE.Mesh( new THREE.BoxGeometry( 100000, 100000, 100000 ), material );
	scene.add( mesh );

	//

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	container.appendChild( renderer.domElement );

	effect = new THREE.StereoEffect( renderer );
	effect.eyeSeparation = 5;
	effect.setSize( innerWidth, innerHeight );

	//////////////////////
	/////////////////
	////////////////

	var wall = new Plane({width:3000, height:70, src:"img/banner.png"});
	wall.mesh.position.z = 250;
	wall.mesh.rotation.y = Math.PI;
	wall.mesh.position.y = 35;
	scene.add(wall.mesh);

	var wall = new Plane({width:3000, height:70, src:"img/banner.png"});
	wall.mesh.position.z = -250;
	wall.mesh.position.y = 35;
	scene.add(wall.mesh);

	for(var i=0;i<11;i++){
		var floor = new Plane({width:500, height:500, src:"img/floor.png"});
		floor.mesh.rotation.x = -Math.PI/2;
		floor.mesh.position.x = -1500 + i*250 + 250;
		scene.add(floor.mesh);
	}

}
var floor;

document.addEventListener( 'mousemove', function(event){
	mouseX = event.clientX;
	mouseY = event.clientY;
}, false );

document.addEventListener( 'mousedown', function(event){
	RUNNING = !RUNNING;
}, false );


function animate() {
	requestAnimationFrame( animate );
	render();
}

var runnerCanvas = document.getElementById("runner_canvas");
var runnerContext = runnerCanvas.getContext('2d');
var image_runner = new Image();
image_runner.src = "img/runner.png";
var image_direction = new Image();
image_direction.src = "img/direction.png";

var RUNNING = false;
var walk = 0;
function render(){

	var dx = mouseX-480;
	var dy = mouseY-480;
	camera.rotation.y = Math.atan2(dy,-dx);

	// run!
	camera.position.y = 90+Math.abs(Math.sin(walk)*5);
	if(RUNNING){

		walk += 0.25;

		var r = camera.rotation.y;
		var vx = -Math.sin(r) * 3;
		var vz = -Math.cos(r) * 3;
		camera.position.x += vx;
		camera.position.z += vz;

		if(camera.position.z<-225) camera.position.z=-225;
		if(camera.position.z>225) camera.position.z=225;

	}else{
		walk = 0;
	}

	effect.render( scene, camera );

	/////////////////////////
	/////////////////////////
	/////////////////////////

	var ctx = runnerContext;
	ctx.clearRect(0,0,300,300);

	ctx.save();
	ctx.translate(150,240);
	ctx.globalAlpha = 0.5;
	ctx.scale(1,0.3);
	ctx.rotate(Math.PI-camera.rotation.y);
	ctx.drawImage(image_direction,-100,-100,200,200);
	ctx.restore();

	ctx.drawImage(image_runner,0,-Math.abs(Math.sin(walk)*4));

}

init();
animate();
