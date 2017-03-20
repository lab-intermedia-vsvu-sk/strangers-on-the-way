/**
 * @author richt / http://richt.me
 * @author WestLangley / http://github.com/WestLangley
 *
 * W3C Device Orientation control (http://w3c.github.io/deviceorientation/spec-source-orientation.html)
 */

THREE.DeviceOrientationControls = function( object ) {

	var scope = this;

	this.object = object;
	this.object.rotation.reorder( "YXZ" );

	this.enabled = true;

	this.deviceOrientation = {};
	this.screenOrientation = 0;

	this.alpha = 0;
	this.alphaOffsetAngle = 0;

	this.cameraPos = new THREE.Vector3(0, 0, 0);
	
	this.initialMotionState = new THREE.Vector3(0, 0, 0);
	this.initializedState = false;


	var onDeviceOrientationChangeEvent = function( event ) {

		scope.deviceOrientation = event;
		//console.log(event);

	};

	var onScreenOrientationChangeEvent = function() {

		scope.screenOrientation = window.orientation || 0;

	};

	var onDeviceMotionChangeEvent = function( event ) {
		
		// TODO: SET CAMERA POSITION BASED ON SENSOR DATA ACCUMULATION http://www.freescale.com/files/sensors/doc/app_note/AN3397.pdf

		var accelerationX = event.accelerationIncludingGravity.x;
		var accelerationY = event.accelerationIncludingGravity.y;
		var accelerationZ = event.accelerationIncludingGravity.z;
		//console.log(event);

		var accelerationOffSet = 2;

		// set first state of device orientation
		if(!scope.initializedState){
			scope.initialMotionState.set(accelerationX, accelerationY, accelerationZ);
			scope.initializedState = true; 
		}

		//scope.object.position.z(scope.object.position.z + accelerationZ);
		var x = scope.object.position.x;
		var y = scope.object.position.y;
		var z = scope.object.position.z;

		// test Z
		if(accelerationZ > scope.initialMotionState.z + accelerationOffSet || accelerationZ < scope.initialMotionState.z - accelerationOffSet){
			scope.cameraPos.set( x,  y, z  + accelerationZ );
			console.log("move camera on Z: " + accelerationZ);
			scope.initialMotionState.set(accelerationX, accelerationY, accelerationZ);
		}

		//var pos = new THREE.Vector3(  );
		scope.cameraPos.set(x + accelerationX, y + accelerationY, z + accelerationZ);
		

		
	}

	// The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

	var setObjectQuaternion = function() {

		var zee = new THREE.Vector3( 0, 0, 1 );

		var euler = new THREE.Euler();

		var q0 = new THREE.Quaternion();

		var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

		return function( quaternion, alpha, beta, gamma, orient ) {

			euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us

			quaternion.setFromEuler( euler ); // orient the device

			quaternion.multiply( q1 ); // camera looks out the back of the device, not the top

			quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) ); // adjust for screen orientation

		}

	}();

	this.connect = function() {

		onScreenOrientationChangeEvent(); // run once on load

		window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );
		//devicemotion
		window.addEventListener( 'devicemotion', onDeviceMotionChangeEvent, false );

		scope.enabled = true;

	};

	this.disconnect = function() {

		window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );
		//devicemotion
		window.removeEventListener( 'devicemotion', onDeviceMotionChangeEvent, false );

		scope.enabled = false;

	};

	this.update = function() {

		if ( scope.enabled === false ) return;

		var alpha = scope.deviceOrientation.alpha ? THREE.Math.degToRad( scope.deviceOrientation.alpha ) + this.alphaOffsetAngle : 0; // Z
		var beta = scope.deviceOrientation.beta ? THREE.Math.degToRad( scope.deviceOrientation.beta ) : 0; // X'
		var gamma = scope.deviceOrientation.gamma ? THREE.Math.degToRad( scope.deviceOrientation.gamma ) : 0; // Y''
		var orient = scope.screenOrientation ? THREE.Math.degToRad( scope.screenOrientation ) : 0; // O

		setObjectQuaternion( scope.object.quaternion, alpha, beta, gamma, orient );
		this.alpha = alpha;

		// TODO: SET CAMERA POSITION BASED ON SENSOR DATA ACCUMULATION http://www.freescale.com/files/sensors/doc/app_note/AN3397.pdf
		scope.object.position.set( scope.cameraPos.x, scope.cameraPos.y, scope.cameraPos.z );

		//console.log(scope.object.position)

	};

	this.updateAlphaOffsetAngle = function( angle ) {

		this.alphaOffsetAngle = angle;
		this.update();

	};

	this.dispose = function() {

		this.disconnect();

	};

	this.connect();

};
