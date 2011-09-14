function initCircle() {
	
	s = 0;
	tmp = "";

	// Creating a new element and setting the color as a class name:
	tmp = $('.green.clock');

	// Assigning some of the elements as variables for speed:
	tmp.rotateLeft = tmp.find('.rotate.left');
	tmp.rotateRight = tmp.find('.rotate.right');
	tmp.display = tmp.find('.display');
	
}

function animation(clock, current, total) {
	
	// Calculating the current angle:
	var angle = (360/total)*(current+1);

	var element;

	if(current==0) {
		// Hiding the right half of the background:
		clock.rotateRight.hide();
		
		// Resetting the rotation of the left part:
		rotateElement(clock.rotateLeft,0);
	}
	
	if(angle<=180)
	{
		// The left part is rotated, and the right is currently hidden:
		element = clock.rotateLeft;
	}
	else
	{
		// The first part of the rotation has completed, so we start rotating the right part:
		clock.rotateRight.show();
		clock.rotateLeft.show();
		
		rotateElement(clock.rotateLeft,180);
		
		element = clock.rotateRight;
		angle = angle-180;
	}

	rotateElement(element,angle);
	
	// Setting the text inside of the display element, inserting a leading zero if needed:
	clock.display.html(current<10?'0'+current:current);
}

function rotateElement(element,angle) {
	// Rotating the element, depending on the browser:
	var rotate = 'rotate('+angle+'deg)';
	
	if(element.css('MozTransform')!=undefined)
		element.css('MozTransform',rotate);
		
	else if(element.css('WebkitTransform')!=undefined)
		element.css('WebkitTransform',rotate);

	// A version for internet explorer using filters, works but is a bit buggy (no surprise here):
	else if(element.css("filter")!=undefined)
	{
		var cos = Math.cos(Math.PI * 2 / 360 * angle);
		var sin = Math.sin(Math.PI * 2 / 360 * angle);
		
		element.css("filter","progid:DXImageTransform.Microsoft.Matrix(M11="+cos+",M12=-"+sin+",M21="+sin+",M22="+cos+",SizingMethod='auto expand',FilterType='nearest neighbor')");

		element.css("left",-Math.floor((element.width()-200)/2));
		element.css("top",-Math.floor((element.height()-200)/2));
	}

}