/***

Plane: Takes an image, is a texture

config = { width, height, image };

***/
function Plane(config){

	var self = this;

	// config
	self.image = config.image;
	self.width = config.width;
	self.height = config.height;

	// Position
	self.x = 0;
	self.y = 0;
	self.z = 0;
    
	// Create a texture that uses a canvas
	self.texture = THREE.ImageUtils.loadTexture(config.src);
	self.texture.minFilter = THREE.LinearFilter;

	// Transparent material
    self.material = new THREE.MeshBasicMaterial({map:self.texture});
    self.material.transparent = true;

    // Geometry & mesh - pivot point should be origin point in MC.
    self.geometry = new THREE.PlaneBufferGeometry(self.width,self.height);
    self.mesh = new THREE.Mesh(self.geometry, self.material);

	/*self.draw = function(){

		// Visible?
		if(self.mc.parent){
			self.material.visible = true;			
		}else{
			self.material.visible = false;
			return;
		}

		// Redraw? (Cache by default)
		if(!self.drawn || self.isAnimated){
			var ctx = self.context;
			ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
			//ctx.fillStyle = "rgba("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+",0.5)";
			//ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
			ctx.save();
			ctx.scale(self.resolution,self.resolution);
			ctx.translate(-self.bounds.x,-self.bounds.y);
			self.mc.draw(self.context);
			ctx.restore();

			self.texture.needsUpdate = true;
			self.drawn = true;
		}

		// Floor?
	    if(self.floor){
	    	var depthIndex = self.mc.parent.getChildIndex(self.mc)/self.mc.parent.getNumChildren();
	    	self.y = -1+depthIndex;
	    }else{
	    	self.y = 0;//-(self.bounds.height+self.bounds.y)/2;
	    	// TOTAL HACK. GOOD ENOUGH ESTIMATE. DUNNO, FIGURE OUT LATER
	    }

		// Translate to ThreeJS coords.
		self.x = self.mc.x - root._stage.x;
		self.z = self.mc.y - root._stage.y;
		var pos = self.mesh.position;
		pos.x = self.x;
		pos.y = self.y;
		pos.z = self.z;

		// FLOOR
		if(self.floor){

			// Flat down
			self.mesh.rotation.x = -Math.TAU/4;

		// NORMAL PROP
		}else{

			// Face camera always?
			if(self.faceCamera){
				var angle = Math.atan2(self.z,self.x);
				self.mesh.rotation.y = -angle - Math.TAU/4;
			}

		}

	};*/

}