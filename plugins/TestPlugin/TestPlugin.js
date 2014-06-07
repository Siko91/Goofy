var testPen = makeToolObj("testPen", null, testPenDraw, null, loadPenContextMenu);
var testCircleMaker = makeToolObj("testCircleMaker", testMakeCircle, null, null, loadCircleContextMenu);

var testPluginTools = [testPen, testCircleMaker];
var testPluginToolBox = makeToolBoxObj(testPluginTools);

var testPlugin = makePluginObj("testPlugin", testPluginToolBox);
addPluginObj(testPlugin);

function testMakeCircle(event) {
    var radius = document.getElementById("circle-radius-input").value;

    currentContext.beginPath();
    currentContext.lineWidth = currentLineWidth;
    currentContext.fillStyle = currentFillColor;
    currentContext.strokeStyle = currentStrokeColor;
    currentContext.arc(mousePosionX, mousePosionY, radius, 0, 2 * Math.PI);
    currentContext.fill();
    currentContext.stroke();
}

function testPenDraw() {
    if (mousePressed) {
        currentContext.lineWidth = currentLineWidth;
        currentContext.lineCap = 'round';
        currentContext.strokeStyle = currentStrokeColor;
        currentContext.beginPath();
        currentContext.moveTo(prevousPosionX, prevousPosionY);
        currentContext.lineTo(mousePosionX, mousePosionY);
        currentContext.stroke();
        currentContext.closePath();
    }
}

function loadCircleContextMenu() {
    var header = "Circle Options"
    var htmlToInsert = "<label for=\"circle-radius-input\">Radius: </label>"
        + "<input type=\"number\" id=\"circle-radius-input\" value=\"30\"/>";
    updateToolOptions(header, htmlToInsert);
}
function loadPenContextMenu() {
    var header = "Pen Options"
    var htmlToInsert = "Just draw as you see fit";
    updateToolOptions(header, htmlToInsert);
}