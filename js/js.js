let scene;
let camera;
let renderer;

let width = window.innerWidth;
let hight = window.innerHeight;

function scene_setup(width,hight) {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, width / hight, 0.1, 1000);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, hight);
	document.body.appendChild(renderer.domElement);
}

scene_setup(width,hight);

const shaderCode = document.getElementById("fragShader").innerHTML;

const textureURL = "gifts.png";
const normalURL = "depth.png";
THREE.ImageUtils.crossOrigin = '';

const texture = THREE.ImageUtils.loadTexture(textureURL);
const normal = THREE.ImageUtils.loadTexture(normalURL);


// let timer = new THREE.Vector2(uniforms.mouse.value.x, uniforms.mouse.value.y);
// function mouseTimeout(timer) {
	
// }
// setTimeout(()=>mouseTimeout(timer),100);

let uTime = 0.1;
let sizeGrid = 1000.0;
let thicknessSegment = 0.6;
let radius = 10.0;

let uniforms = {
	sizeGrid: { type: "f", value: sizeGrid },
	mouse: {type:'v3', value: new THREE.Vector3()},
	random: {type:'v3', value: new THREE.Vector3()},
	res: { type:'v2', value:new THREE.Vector2(window.innerWidth,window.innerHeight)},
	u_time: {type:'f', value: uTime},
	radius: { type: "f", value: radius },
	color: {type:'v3', value: new THREE.Vector3()},
};


let material = new THREE.ShaderMaterial({uniforms:uniforms, fragmentShader:shaderCode});
let geometry = new THREE.PlaneGeometry(10,10);
let sprite = new THREE.Mesh(geometry, material);

scene.add(sprite);
camera.position.z = 2;

uniforms.mouse.value.z = 0.05;


document.addEventListener('keydown', function(event) {
	if (event.code == 'ArrowUp') {
		sizeGrid = Math.abs(sizeGrid + 10.0);
		uniforms.sizeGrid.value = sizeGrid;
	  console.log('Больше');
	} else if (event.code == 'ArrowDown') {
		sizeGrid = Math.abs(sizeGrid - 10.0);
		uniforms.sizeGrid.value = sizeGrid;
		console.log('Меньше');
	} else if (event.code == 'ArrowRight') {
		thicknessSegment = Math.abs(thicknessSegment + 0.2);
		uniforms.thicknessSegment.value = thicknessSegment;
		console.log('Толще');
	} else if (event.code == 'ArrowLeft') {
		thicknessSegment = Math.abs(thicknessSegment - 0.2);
		uniforms.thicknessSegment.value = thicknessSegment;
		console.log('Уже');
	} else if (event.code == 'ArrowLeft') {
		thicknessSegment = Math.abs(thicknessSegment - 0.2);
		uniforms.mouseClick.value.x = uniforms.mouse.value.x;
		uniforms.mouseClick.value.y = uniforms.mouse.value.y;
		console.log('Уже');
	}
});



function render() {
	uniforms.res.value.x = window.innerWidth;
	uniforms.res.value.y = window.innerHeight;
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}
render();

let animation;
function render2() {
	uniforms.u_time.value += 40.0;
	animation = requestAnimationFrame( render2 );
}

let bgColor1 = Math.random();
let bgColor2 = Math.random();
let bgColor3 = Math.random();


let randomColor1 = Math.random();
let randomColor2 = Math.random();
let randomColor3 = Math.random();


document.onclick = function(event) {
	uniforms.u_time.value = 0.0;
	cancelAnimationFrame(animation);
	render2();
	uniforms.color.value.x = bgColor1;
	uniforms.color.value.y = bgColor2;
	uniforms.color.value.z = bgColor3;
	bgColor1 = randomColor1;
	bgColor2 = randomColor2;
	bgColor3 = randomColor3;
	uniforms.random.value.x = randomColor1;
	uniforms.random.value.y = randomColor2;
	uniforms.random.value.z = randomColor3;
	randomColor1 = Math.random();
	randomColor2 = Math.random();
	randomColor3 = Math.random();
	uniforms.mouse.value.x = event.clientX;
	uniforms.mouse.value.y = -event.clientY + window.innerHeight;
}