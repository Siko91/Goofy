var shapeFillTool = makeToolObj("shapeFillTool", begin, fillShape, end, loadShapeFillContextMenu, 1);

var shapeFillTools = [shapeFillTool];
var shapeFillToolBox = makeToolBoxObj(shapeFillTools);

var shapeFillToolPlugin = makePluginObj("shapeFillTool", shapeFillToolBox);
addPluginObj(shapeFillToolPlugin);

function begin() {
  document.body.style.cursor = "auto";
	currentContext.beginPath();
  currentContext.moveTo(prevousPositionX, prevousPositionY);
}

function fillShape() {
	currentContext.fillStyle = currentFillColor;
	currentContext.lineWidth = currentLineWidth;
    if (mousePressed) {
        currentContext.lineWidth = currentLineWidth;
   	    currentContext.strokeStyle = currentStrokeColor;
   	    currentContext.lineTo(mousePositionX, mousePositionY);
		currentContext.strokeStyle = currentFillColor;
   	    currentContext.stroke();
    }
}

function end() {
	currentContext.closePath();
    currentContext.fill();
}

function loadShapeFillContextMenu() {
	var header = "Shape fill options:"
    var htmlToInsert = '<span>Draw a shape and it will be filled. </span>';
    updateToolOptions(header, htmlToInsert);
}