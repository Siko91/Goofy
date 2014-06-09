var eraser = makeToolObj("eraser", null, erase, null, loadEraserMenu);

var testPluginTools = [eraser];
var testPluginToolBox = makeToolBoxObj(testPluginTools);

var testEraser = makePluginObj("testEraser", testPluginToolBox);
addPluginObj(testEraser);

function testMakeCircle(event) {
    var radius = document.getElementById("circle-radius-input").value;

    currentContext.beginPath();
    currentContext.lineWidth = currentLineWidth;
    currentContext.fillStyle = currentFillColor;
    currentContext.strokeStyle = currentStrokeColor;
    currentContext.arc(mousePositionX, mousePositionY, radius, 0, 2 * Math.PI);
    currentContext.fill();
    currentContext.stroke();
}

function erase() {
    if (mousePressed) {
        currentContext.lineWidth = document.getElementById('eraser-width').value;
        currentContext.lineCap = 'round';
        currentContext.strokeStyle = '#fff';
        currentContext.beginPath();
        currentContext.moveTo(prevousPositionX, prevousPositionY);
        currentContext.lineTo(mousePositionX, mousePositionY);
        currentContext.stroke();
        currentContext.closePath();
    }
}
function loadEraserMenu() {
    header = "Eraser"
    htmlToInsert = "<label for='eraser-width'>Eraser Width </label><input type='number' id='eraser-width' value='10'/> ";
    updateToolOptions(header, htmlToInsert);
}