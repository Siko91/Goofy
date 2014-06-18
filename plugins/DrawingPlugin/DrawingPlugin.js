var freeFormPenTool = makeToolObj("Free Form Pen", null, freeFormPenDraw, null, loadFreeFormPenTool, 3);

var straightLineTool = makeToolObj("Straight Line", drawingPluginSetStartPoint, null, drawStrightLine, loadLineDrawingContextMenu);
var lockedStraightLineTool = makeToolObj("Locked Line", drawingPluginSetStartPoint, null, drawLockedStrightLine, loadLineDrawingContextMenu);

var makePathTool = makeToolObj("Path", startDrawPath, null, drawNextPathLine, loadPathContextMenu);

var quadraticCurveTool = makeToolObj("Quadratic Curve", quadraticCurveOnMousePress, null, quadraticCurveOnMouseRelease, loadQuadraticCurveContextMenu);

var makeSquareTool = makeToolObj("Square", drawingPluginSetStartPoint, null, drawSquare, loadFigureDrawingContextMenu);
var makeRectTool = makeToolObj("Rectangle", drawingPluginSetStartPoint, null, drawRectangle, loadFigureDrawingContextMenu);
var makeCircleTool = makeToolObj("Circle", drawingPluginSetStartPoint, null, drawCircle, loadFigureDrawingContextMenu);
var makeEllipseTool = makeToolObj("Ellipse", drawingPluginSetStartPoint, null, drawEllipse, loadFigureDrawingContextMenu);

var addTextTool = makeToolObj("Add Text", setCoordinatesForTextTool, null, null, loadAddTextToolContextMenu, 1);

var drawingPluginTools = [
    freeFormPenTool,
    straightLineTool,
    lockedStraightLineTool,
    makePathTool,
    quadraticCurveTool,
    makeSquareTool,
    makeRectTool,
    makeCircleTool,
    makeEllipseTool,
    addTextTool
    ];

var drawingPluginToolBox = makeToolBoxObj(drawingPluginTools);

var drawingPlugin = makePluginObj("Drawing Plugin", drawingPluginToolBox);
addPluginObj(drawingPlugin);


function drawingPluginDrawLine(fromX, fromY, toX, toY) {
    currentContext.lineWidth = currentLineWidth;
    currentContext.lineCap = 'round';
    currentContext.strokeStyle = currentStrokeColor;
    currentContext.beginPath();
    currentContext.moveTo(fromX, fromY);
    currentContext.lineTo(toX, toY);
    currentContext.stroke();
    currentContext.closePath();
}

function drawingPluginSetStartPoint() {
    customPositionX = mousePositionX;
    customPositionY = mousePositionY;
}

function freeFormPenDraw() {
    if (mousePressed) {
        drawingPluginDrawLine(
            prevousPositionX,
            prevousPositionY,
            mousePositionX,
            mousePositionY
            );
    }
}

function drawStrightLine() {
    drawingPluginDrawLine(
            customPositionX,
            customPositionY,
            mousePositionX,
            mousePositionY
            );
}

function drawLockedStrightLine() {
    var distanceX = Math.abs(customPositionX - mousePositionX),
        distanceY = Math.abs(customPositionY - mousePositionY);
        
    var pointX = mousePositionX,
        pointY = mousePositionY;

    if (distanceX > distanceY) {
        pointY = customPositionY;
    }
    else if (distanceY > distanceX) {
        pointX = customPositionX;
    }

    drawingPluginDrawLine(
            customPositionX,
            customPositionY,
            pointX,
            pointY
            );
}

function startDrawPath() {
    if (!customVariable) {
        drawingPluginSetStartPoint()
        customVariable = true;
    }
}

function drawNextPathLine() {
    drawingPluginDrawLine(
            customPositionX,
            customPositionY,
            mousePositionX,
            mousePositionY
            );
    drawingPluginSetStartPoint()
}

function quadraticCurveOnMousePress() {
    if (!customVariable.hasStartedDrawingQuadraticCurve) {
        customVariable.from.x = mousePositionX;
        customVariable.from.y = mousePositionY;

        drawingPluginDrawLine(
            mousePositionX,
            mousePositionY,
            mousePositionX-1,
            mousePositionY-1
            );
    }
}

function quadraticCurveOnMouseRelease() {
    if (!customVariable.hasStartedDrawingQuadraticCurve) {
        customVariable.to.x = mousePositionX;
        customVariable.to.y = mousePositionY;

        drawingPluginDrawLine(
            mousePositionX,
            mousePositionY,
            mousePositionX-1,
            mousePositionY-1
            );
        customVariable.hasStartedDrawingQuadraticCurve = true;
    }
    else {
        customVariable.curvingPoint.x = mousePositionX;
        customVariable.curvingPoint.y = mousePositionY;

        currentContext.beginPath();
        currentContext.moveTo(
            customVariable.from.x,
            customVariable.from.y);
        currentContext.quadraticCurveTo(
            customVariable.curvingPoint.x,
            customVariable.curvingPoint.y,
            customVariable.to.x,
            customVariable.to.y);
        currentContext.stroke();

        customVariable.hasStartedDrawingQuadraticCurve = false;
    }
}

function drawSquare() {
    var width = Math.abs(customPositionX - mousePositionX);
    var height = Math.abs(customPositionY - mousePositionY);
    var side = Math.min(width, height)

    if (customPositionX > mousePositionX) {
        customPositionX = mousePositionX;
    }
    if (customPositionY > mousePositionY) {
        customPositionY = mousePositionY;
    }

    currentContext.beginPath();
    currentContext.lineWidth = currentLineWidth;
    currentContext.fillStyle = currentFillColor;
    currentContext.strokeStyle = currentStrokeColor;

    currentContext.rect(
        customPositionX,
        customPositionY,
        side,
        side);

    currentContext.fill();
    currentContext.stroke();
}

function drawRectangle() {
    var width = Math.abs(customPositionX - mousePositionX);
    var height = Math.abs(customPositionY - mousePositionY);

    if (customPositionX > mousePositionX) {
        customPositionX = mousePositionX;
    }
    if (customPositionY > mousePositionY) {
        customPositionY = mousePositionY;
    }

    currentContext.beginPath();
    currentContext.lineWidth = currentLineWidth;
    currentContext.fillStyle = currentFillColor;
    currentContext.strokeStyle = currentStrokeColor;

    currentContext.rect(
        customPositionX,
        customPositionY,
        width,
        height);

    currentContext.fill();
    currentContext.stroke();
}

function drawCircle() {
    var width = Math.abs(customPositionX - mousePositionX);
    var height = Math.abs(customPositionY - mousePositionY);
    var radius = Math.min(width, height) / 2;

    if (customPositionX > mousePositionX) {
        customPositionX = customPositionX - radius;
    }
    else {
        customPositionX = customPositionX + radius;
    }

    if (customPositionY > mousePositionY) {
        customPositionY = customPositionY - radius;
    }
    else {
        customPositionY = customPositionY + radius
    }

    currentContext.beginPath();
    currentContext.lineWidth = currentLineWidth;
    currentContext.fillStyle = currentFillColor;
    currentContext.strokeStyle = currentStrokeColor;

    currentContext.arc(
        customPositionX,
        customPositionY,
        radius,
        0,
        2 * Math.PI);

    currentContext.fill();
    currentContext.stroke();
}

function drawEllipse() {
    var width = Math.abs(customPositionX - mousePositionX);
    var height = Math.abs(customPositionY - mousePositionY);

    if (customPositionX > mousePositionX) {
        customPositionX = mousePositionX + width / 2;
    }
    else {
        customPositionX = mousePositionX - width / 2;
    }
 
    if (customPositionY > mousePositionY) {
        customPositionY = mousePositionY + height / 2;
    }
    else {
        customPositionY = mousePositionY - height / 2;
    }

    // this is a workaround for a bug that I couldn't find
    width *= (4/3);

    currentContext.beginPath();
    currentContext.lineWidth = currentLineWidth;
    currentContext.fillStyle = currentFillColor;
    currentContext.strokeStyle = currentStrokeColor;

    currentContext.moveTo(customPositionX, customPositionY - height / 2);

    currentContext.bezierCurveTo(
    customPositionX + width / 2, customPositionY - height / 2,
    customPositionX + width / 2, customPositionY + height / 2,
    customPositionX, customPositionY + height / 2);

    currentContext.bezierCurveTo(
    customPositionX - width / 2, customPositionY + height / 2,
    customPositionX - width / 2, customPositionY - height / 2,
    customPositionX, customPositionY - height / 2);

//    currentContext.bezierCurveTo(
//    customPositionX + width, customPositionY,
//    customPositionX + width, customPositionY + height,
//    customPositionX + width / 2, customPositionY + height);
//
//    currentContext.bezierCurveTo(
//    customPositionX, customPositionY + height,
//    customPositionX, customPositionY,
//    customPositionX + width / 2, customPositionY);

    currentContext.fill();
    currentContext.stroke();
}

function setCoordinatesForTextTool() {
    document.getElementById('text-position-x-input').value = mousePositionX;
    document.getElementById('text-position-y-input').value = mousePositionY;
}

function insertTextBtnClicked() {
    var text = document.getElementById('text-input').value;
    var positionX = parseInt(document.getElementById('text-position-x-input').value);
    var positionY = parseInt(document.getElementById('text-position-y-input').value);
    var fontSize = parseInt(document.getElementById('text-size-input').value) || 20;
    var fontFamily = customVariable[document.getElementById('text-family-select').selectedIndex];

    if (isNaN(positionX) || isNaN(positionY)) {
        alert('invalid position');
        return;
    }
    currentContext.lineWidth = currentLineWidth;
    currentContext.lineCap = 'round';
    currentContext.strokeStyle = currentStrokeColor;
    currentContext.fillStyle = currentFillColor;
    currentContext.beginPath();
    currentContext.moveTo(positionX, positionY);
    currentContext.font = fontSize + "px " + fontFamily;
    currentContext.fillText(text, positionX, positionY);
    currentContext.strokeText(text, positionX, positionY);
}

function loadFreeFormPenTool() {
    var header = "Free Form Pen"
    var htmlToInsert = "Just draw as you see fit";
    updateToolOptions(header, htmlToInsert);
}

function loadLineDrawingContextMenu() {
    var header = "Straight Line"
    var htmlToInsert = "Press, drag and release to draw a straight line.";
    updateToolOptions(header, htmlToInsert);
}

function loadPathContextMenu() {
    var header = "Path"
    var htmlToInsert = "Press, drag and release to draw a straight line.<br/>After that each click will resault in a new line, continuing the startet path.";
    updateToolOptions(header, htmlToInsert);
}

function loadQuadraticCurveContextMenu() {
    var header = "Quadratic Curve"
    var htmlToInsert = "Press, drag and release to set the start and end points of the line.<br/>Then click to set the curving point.";
    updateToolOptions(header, htmlToInsert);

    customVariable = {
        from: {x: NaN, y: NaN},
        to: {x: NaN, y: NaN},
        curvingPoint: {x: NaN, y: NaN},
        hasStartedDrawingQuadraticCurve: false
    }
}

function loadFigureDrawingContextMenu() {
    var header = "Figure Drawig"
    var htmlToInsert = "Press, drag and release to draw the selected figure.";
    updateToolOptions(header, htmlToInsert);
}

function loadAddTextToolContextMenu() {
    customVariable = ['Ariel', 'Times New Roman', 'Georgia', 'Comic Sans MS', 'Courier New', 'Impact', 'Lucida Console', 'Tahoma', 'Trebuchet MS'];

    var header = "Add Text"
    var htmlToInsert = "Click on the canvas to select a positon, and use this panel to add text."
    + "<br/>"
        + "<label for=\"text-input\">Text: </label>"
        + "<input type=\"text\" id=\"text-input\"/>"
    + "<br/>"
        + "<label for=\"text-position-x-input\">X: </label>"
        + "<input type=\"number\" id=\"text-position-x-input\"/>"
        + "<label for=\"text-position-y-input\">X: </label>"
        + "<input type=\"number\" id=\"text-position-y-input\"/>"
    + "<br/>"
        + "<label for=\"text-size-input\">Text Size: </label>"
        + "<input type=\"number\" id=\"text-size-input\" value=\"35\"/>"
    + "<br/>"
        + "<select id=\"text-family-select\">"
        + "<select>"
    + "<br/>"
        + "<button onclick='insertTextBtnClicked()'>InsertText</button>";

    updateToolOptions(header, htmlToInsert);

    var $fontSelector = $("#text-family-select");
    for (var i = 0; i < customVariable.length; i++) {
        $('<option/>')
            .append(customVariable[i])
            .appendTo($fontSelector);
    }
}