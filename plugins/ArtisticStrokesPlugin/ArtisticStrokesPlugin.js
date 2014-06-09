var roundBrush = makeToolObj("Round Brush", null, roundBrushDraw, null, loadRoundBrushContextMenu, 100);
var smoothPen = makeToolObj("Smooth Pen", setFirstPointOfSmoothPen, setAPointOfSmoothPen, drawWithSmoothPen, loadSmoothPenContextMenu, 2);

var ArtisticStrokesTools = [roundBrush, smoothPen];
var ArtisticStrokesToolBox = makeToolBoxObj(ArtisticStrokesTools);

var ArtisticStrokesPlugin = makePluginObj("Artistic Strokes", ArtisticStrokesToolBox);
addPluginObj(ArtisticStrokesPlugin);

function drawLineWithCusumWidthAndColor(lineWidth, lineColor, fromX, fromY, toX, toY) {
    currentContext.lineWidth = lineWidth;
    currentContext.lineCap = 'round';
    currentContext.strokeStyle = lineColor;
    currentContext.beginPath();
    currentContext.moveTo(fromX, fromY);
    currentContext.lineTo(toX, toY);
    currentContext.stroke();
    currentContext.closePath();
}

function getColorWithSetOpacity(color, newOpacity) {
    var startIndex = color.lastIndexOf(",") + 1;
    var opacity = parseFloat(color.substring(startIndex, color.length - 1));
    newOpacity = newOpacity * opacity;
    color = color.split("");
    color = color.splice(0, startIndex).join("") + newOpacity + ")";
    return color;
}

function getDistanceBetwenn2DPoints(x1, y1, x2, y2) {
    // [ c2 = a2 + b2 ] return c
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function roundBrushDraw() {
    if (mousePressed) {
        drawLineWithCusumWidthAndColor(currentLineWidth, getColorWithSetOpacity(currentStrokeColor, 0.01));
        drawLineWithCusumWidthAndColor(currentLineWidth * 0.6, getColorWithSetOpacity(currentStrokeColor, 0.02), prevousPositionX, prevousPositionY, mousePositionX, mousePositionY);
        drawLineWithCusumWidthAndColor(currentLineWidth * 0.4, getColorWithSetOpacity(currentStrokeColor, 0.02), prevousPositionX, prevousPositionY, mousePositionX, mousePositionY);
        drawLineWithCusumWidthAndColor(currentLineWidth * 0.2, getColorWithSetOpacity(currentStrokeColor, 0.02), prevousPositionX, prevousPositionY, mousePositionX, mousePositionY);
        drawLineWithCusumWidthAndColor(currentLineWidth * 0.2, getColorWithSetOpacity(currentStrokeColor, 0.05), prevousPositionX, prevousPositionY, mousePositionX, mousePositionY);
        drawLineWithCusumWidthAndColor(currentLineWidth * 0.1, getColorWithSetOpacity(currentStrokeColor, 0.01), prevousPositionX, prevousPositionY, mousePositionX, mousePositionY);
    }
}

function setFirstPointOfSmoothPen() {
    customVariable = [];
    customVariable.push({ x: mousePositionX, y: mousePositionY });
    customPositionX = mousePositionX;
    customPositionY = mousePositionY;
}

function setAPointOfSmoothPen() {
    if (mousePressed) {
        var minDistanceBetweenPoints = document.getElementById("min-distance-input").value;

        drawLineWithCusumWidthAndColor(1, getColorWithSetOpacity(currentStrokeColor, 0.05), prevousPositionX, prevousPositionY, mousePositionX, mousePositionY);
//        drawLineWithCusumWidthAndColor(1, getColorWithSetOpacity('rgba(0,255,0,1)', 0.3), prevousPositionX, prevousPositionY, mousePositionX, mousePositionY);

        if (getDistanceBetwenn2DPoints(
                mousePositionX,
                mousePositionY,
                customPositionX,
                customPositionY)
                > minDistanceBetweenPoints) {

            drawLineWithCusumWidthAndColor(1, getColorWithSetOpacity(currentStrokeColor, 0.05), customPositionX, customPositionY, mousePositionX, mousePositionY);
//            drawLineWithCusumWidthAndColor(1, getColorWithSetOpacity('rgba(255,0,0,1)', 0.3), customPositionX, customPositionY, mousePositionX, mousePositionY);
            customVariable.push({ x: mousePositionX, y: mousePositionY });

            customPositionX = mousePositionX;
            customPositionY = mousePositionY;
        }
    }
}

function drawWithSmoothPen() {

    currentContext.lineWidth = currentLineWidth;
    currentContext.strokeStyle = currentStrokeColor;

    currentContext.moveTo(
        (customVariable[0].x + customVariable[1].x) / 2,
        (customVariable[0].y + customVariable[1].y) / 2);

    for (var pointIndex = 1; pointIndex < customVariable.length - 1; pointIndex++) {
        var xc = (customVariable[pointIndex].x + customVariable[pointIndex + 1].x) / 2;
        var yc = (customVariable[pointIndex].y + customVariable[pointIndex + 1].y) / 2;
        currentContext.quadraticCurveTo(customVariable[pointIndex].x, customVariable[pointIndex].y, xc, yc);
        currentContext.stroke();
    }
    var lastPointIndex = customVariable.length - 1;
    currentContext.quadraticCurveTo(
        customVariable[lastPointIndex - 1].x, customVariable[lastPointIndex - 1].y,
        (customVariable[lastPointIndex-1].x + customVariable[lastPointIndex].x) / 2,
        (customVariable[lastPointIndex-1].y + customVariable[lastPointIndex].y) / 2);
    currentContext.stroke();
    customVariable.splice(0, customVariable.length);
}

function loadRoundBrushContextMenu() {
    var header = "Round Brush"
    var htmlToInsert = "Just draw as you see fit";
    updateToolOptions(header, htmlToInsert);
}

function loadSmoothPenContextMenu() {
    var header = "Smooth Pen"
    var htmlToInsert = "<label for=\"min-distance-input\">Minimum distance between points: </label>"
        + "<input type=\"number\" id=\"min-distance-input\" value=\"50\"/>";
    updateToolOptions(header, htmlToInsert);
}