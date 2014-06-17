var freeFormPenTool = makeToolObj("Free Form Pen", null, freeFormPenDraw, null, loadFreeFormPenTool);

var straightLineTool = makeToolObj("Straight Line", drawingPluginSetStartPoint, null, drawStrightLine, loadLineDrawingContextMenu);
var lockedStraightLineTool = makeToolObj("Locked Straight Line", drawingPluginSetStartPoint, null, drawLockedStrightLine, loadLineDrawingContextMenu);

var makePathTool = makeToolObj("Path", startDrawPath, null, drawNextPathLine, loadPathContextMenu);

var quadraticCurveTool = makeToolObj("Quadratic Curve", quadraticCurveOnMousePress, null, quadraticCurveOnMouseRelease, loadQuadraticCurveContextMenu);

var makeSquareTool = makeToolObj("Square", drawingPluginSetStartPoint, null, drawSquare, loadFigureDrawingContextMenu);
var makeRectTool = makeToolObj("Rectangle", drawingPluginSetStartPoint, null, drawRectangle, loadFigureDrawingContextMenu);
var makeCircleTool = makeToolObj("Circle", drawingPluginSetStartPoint, null, drawCircle, loadFigureDrawingContextMenu);
var makeEllipseTool = makeToolObj("Ellipse", drawingPluginSetStartPoint, null, drawEllipse, loadFigureDrawingContextMenu);

var addTextTool = makeToolObj("Add Text", setCoordinatesForTextTool, null, null, loadAddTextToolContextMenu);

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

///////////////////////////////////////////////
function quadraticCurveOnMousePress() {
    alert("not implemented yet");
}

function quadraticCurveOnMouseRelease() {
    alert("not implemented yet");
}
///////////////////////////////////////////////

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
    var radius = Math.max(width, height) / 2;

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

    currentContext.beginPath();

    currentContext.moveTo(customPositionX, customPositionY - height / 2);

    currentContext.bezierCurveTo(
    customPositionX + width / 2, customPositionY - height / 2,
    customPositionX + width / 2, customPositionY + height / 2,
    customPositionX, customPositionY + height / 2);

    currentContext.bezierCurveTo(
    customPositionX - width / 2, customPositionY + height / 2,
    customPositionX - width / 2, customPositionY - height / 2,
    customPositionX, customPositionY - height / 2);

    currentContext.fill();
    currentContext.stroke();
}

///////////////////////////////////////////////
function setCoordinatesForTextTool() {
    alert("not implemented yet");
}
///////////////////////////////////////////////

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
}

function loadFigureDrawingContextMenu() {
    var header = "Figure Drawig"
    var htmlToInsert = "Press, drag and release to draw the selected figure.";
    updateToolOptions(header, htmlToInsert);
}

function loadAddTextToolContextMenu() {
    var header = "Add Text"
    var htmlToInsert = "TODO: X, Y, input, button";
    updateToolOptions(header, htmlToInsert);
}