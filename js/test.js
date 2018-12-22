window.addEventListener("load",function(){
  var width = window.innerWidth;
  var height = window.innerHeight;
  //renderer 객체 생성
  var renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setSize(width,height);
  document.body.appendChild(renderer.domElement);
  //scene 객체 생성
  var scene = new THREE.Scene();
  //camera 객체 생성
  var angle = 75;
  var aspect = width/height;
  var near = 0.1;
  var far = 10000;
  var camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
  camera.position.set(0,0,200);
  //light 객체 생성
  ambientLight = new THREE.AmbientLight(0xffffff,.1,18);
  scene.add(ambientLight)
  var light = new THREE.PointLight();
  light.position.set(10000,10000,10000);
  scene.add(light);

  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.load("./js/sculture.mtl",function(materials){
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("./js/sculture.obj",function(object){
      var x = 0;
      setInterval(function(){
        x++;
        object.rotation.y = x*0.03;
      },50)
      
      object.position.y = -340;
      object.position.z = -200;
      scene.add(object);
    })
  })



  //resize
  window.addEventListener( 'resize', onWindowResize, false );
  function onWindowResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  //cameramove
  var mouseX = 0, mouseY = 0;
  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) * .05;
    mouseY = ( event.clientY - windowHalfY ) * .05;
  }
  function loop(){
    /*mesh.rotation.x += .01;
    mesh.rotation.y += .01;
    mesh.rotation.z += .01;
    */
    camera.position.x += ( mouseX - camera.position.x ) * .02;
    camera.position.y += ( - mouseY - camera.position.y ) * .02;
    camera.lookAt( scene.position );
    renderer.render(scene,camera);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})
