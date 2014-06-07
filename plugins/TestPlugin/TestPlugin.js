var circleMaker = makeToolObj("circleMaker", MakeCircle, null, null, loadCircleContextMenu);
var circleMaker2 = makeToolObj("circleMaker2", MakeCircle, null, null, loadCircleContextMenu);

var testPluginTools = [circleMaker, circleMaker2];
var testPluginToolBox = makeToolBoxObj(testPluginTools);

var testPlugin = makePluginObj("testPlugin", testPluginToolBox);
addPluginObj(testPlugin);

function MakeCircle(event) {
    var ctx = currentLayer.getContext('2d');

    var radius = document.getElementById("circle-radius-input").value;

    ctx.beginPath();
    ctx.lineWidth = currentLineWidth;
    ctx.fillStyle = currentFillColor;
    ctx.strokeStyle = currentStrokeColor;
    ctx.arc(mousePosionX, mousePosionY, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function loadCircleContextMenu() {
    header = "Circle Options"
    htmlToInsert = "<label for=\"circle-radius-input\">Radius: </label>"
        + "<input type=\"number\" id=\"circle-radius-input\" value=\"30\"/>";
    updateToolOptions(header, htmlToInsert);
}