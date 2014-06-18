var roundBrush = makeToolObj("Round Brush", null, roundBrushDraw, null, loadRoundBrushContextMenu, 100);
var strokeBrush = makeToolObj("Stroke Brush", startStrokeBrushDraw, strokeBrushDraw, null, loadStrokeingBrushContextMenu, 80);
var smoothPen = makeToolObj("Smooth Pen", setFirstPointOfSmoothPen, setAPointOfSmoothPen, drawWithSmoothPen, loadSmoothPenContextMenu, 2);
var pressureBrush = makeToolObj("Pressure Brush", startPressureBrushDrawll, pressureBrushDraw, null, loadPressureBrushContextMenu, 50);

var artisticRubber = makeToolObj("Artistic Rubber", artisticRubberClear, artisticRubberClear, null, loadArtisticRubberContextMenu, 40);


var ArtisticStrokesTools = [
    roundBrush,
    strokeBrush,
    smoothPen,
    pressureBrush,
    artisticRubber];
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

function makeRectMoreTransperent(opacityPercentage, x, y, width, height) {
    var oldArray = currentContext.getImageData(x, y, width, height);
    //count through only the alpha pixels
    for (var d = 3; d < oldArray.data.length; d += 4) {
        oldArray.data[d] = Math.floor(oldArray.data[d] * opacityPercentage);
    }
    currentContext.putImageData(oldArray, x, y);
}

function getColorWithSetOpacity(color, newOpacity) {
    var startIndex = color.lastIndexOf(",") + 1;
    var opacity = parseFloat(color.substring(startIndex, color.length - 1));
    newOpacity = newOpacity * opacity;
    color = color.split("");
    color = color.splice(0, startIndex).join("") + newOpacity + ")";
    return color;
}

function getColorOpacity(color) {
    var startIndex = color.lastIndexOf(",") + 1;
    var opacity = parseFloat(color.substring(startIndex, color.length - 1));
    return opacity;
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

function startStrokeBrushDraw() {
    var sizeIsIncreasing = document.getElementById("size-step-direction-selector").selectedIndex === 0;
    if (sizeIsIncreasing) {
        customVariable = 1;
    }
    else {
        customVariable = currentLineWidth;
    }
}

function strokeBrushDraw() {
    if (mousePressed) {
        var sizeIsIncreasing = document.getElementById("size-step-direction-selector").selectedIndex === 0;
        var inputPower = parseFloat(document.getElementById("decreasing-power-input").value);

        if (sizeIsIncreasing && customVariable < currentLineWidth) {
            if (inputPower > 0) {
                customVariable += inputPower;
            }
            else {
                customVariable++;
            }
        }
        else if (customVariable > 1) {
            if (inputPower > 0) {
                customVariable -= inputPower;
            }
            else {
                customVariable--;
            }
        }
        drawLineWithCusumWidthAndColor(customVariable, getColorWithSetOpacity(currentStrokeColor, 0.1));
        drawLineWithCusumWidthAndColor(customVariable * 0.6, getColorWithSetOpacity(currentStrokeColor, 0.3), prevousPositionX, prevousPositionY, mousePositionX, mousePositionY);
        drawLineWithCusumWidthAndColor(customVariable * 0.4, getColorWithSetOpacity(currentStrokeColor, 0.3), prevousPositionX, prevousPositionY, mousePositionX, mousePositionY);
        drawLineWithCusumWidthAndColor(customVariable * 0.2, getColorWithSetOpacity(currentStrokeColor, 0.3), prevousPositionX, prevousPositionY, mousePositionX, mousePositionY);
        drawLineWithCusumWidthAndColor(customVariable * 0.2, getColorWithSetOpacity(currentStrokeColor, 0.3), prevousPositionX, prevousPositionY, mousePositionX, mousePositionY);
        drawLineWithCusumWidthAndColor(customVariable * 0.1, getColorWithSetOpacity(currentStrokeColor, 0.3), prevousPositionX, prevousPositionY, mousePositionX, mousePositionY);
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

        // actual path
        drawLineWithCusumWidthAndColor(1, getColorWithSetOpacity(currentStrokeColor, 0.05), prevousPositionX, prevousPositionY, mousePositionX, mousePositionY);

        if (getDistanceBetwenn2DPoints(
                mousePositionX,
                mousePositionY,
                customPositionX,
                customPositionY)
                > minDistanceBetweenPoints) {

            // angular path
            drawLineWithCusumWidthAndColor(1, getColorWithSetOpacity(currentStrokeColor, 0.05), customPositionX, customPositionY, mousePositionX, mousePositionY);
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

function startPressureBrushDrawll() {
    var color = currentStrokeColor;

    var indexOfComma = color.indexOf(",");
    var indexOfSecondComma = color.indexOf(",", indexOfComma+1);
    var indexOfLastComma = color.lastIndexOf(",");

    var red = parseFloat(color.substring(5, indexOfComma));
    var green = parseFloat(color.substring(indexOfComma + 1, indexOfSecondComma));
    var blue = parseFloat(color.substring(indexOfSecondComma + 1, indexOfLastComma));
    var opacity = parseFloat(color.substring(indexOfLastComma + 1, currentStrokeColor.length - 1));


    customVariable = {
        red: red,
        green: green,
        blue: blue,
        opacity: opacity
    };
}

function pressureBrushDraw() {
    if (mousePressed) {
        var step = parseFloat(document.getElementById("pressure-change-speed-input").value);
        var opacityStep = 0.05;
        
        if (document.getElementById("pressure-type-selector").selectedIndex === 1) {
            // if decreasing pressure
            step = -step;
            opacityStep = -opacityStep;
        }

        var changeReds = document.getElementById("change-reds-selector").checked;
        var changeGreens = document.getElementById("change-greens-selector").checked;
        var changeBlues = document.getElementById("change-blues-selector").checked;
        var changeOpacity = document.getElementById("change-opacity-selector").checked;

        if (changeReds) {
            customVariable.red -= step;
        }
        if (changeGreens) {
            customVariable.green -= step;
        }
        if (changeBlues) {
            customVariable.blue -= step;
        }
        if (changeOpacity) {
            customVariable.opacity += opacityStep;
        }
        
        var color = "rgba(" + customVariable.red + "," + customVariable.green + "," + customVariable.blue + "," + customVariable.opacity + ")";
        
        drawLineWithCusumWidthAndColor(currentLineWidth, getColorWithSetOpacity(color, 0.1));
        drawLineWithCusumWidthAndColor(currentLineWidth * 0.6, getColorWithSetOpacity(color, 0.2), prevousPositionX, prevousPositionY, mousePositionX, mousePositionY);
        drawLineWithCusumWidthAndColor(currentLineWidth * 0.3, getColorWithSetOpacity(color, 0.2), prevousPositionX, prevousPositionY, mousePositionX, mousePositionY);
    }
}

function artisticRubberClear() {
    if (mousePressed) {
        var size = currentLineWidth;

        callClearer(size, 0.95);
        callClearer(size * 0.6, 0.95);
        callClearer(size * 0.4, 0.95);
        callClearer(size * 0.2, 0.85);
        callClearer(size * 0.1, 0.85);

        function callClearer(size, opacityPercentage) { 
            var x = mousePositionX - (size / 2),
                y = mousePositionY - (size / 2);

            makeRectMoreTransperent(opacityPercentage, x, y, size, size);
        }
    }
}

function loadRoundBrushContextMenu() {
    var header = "Round Brush"
    var htmlToInsert = "Just draw as you see fit";
    updateToolOptions(header, htmlToInsert);
}

function loadStrokeingBrushContextMenu() {
    var header = "Decreasing Brush"
    var htmlToInsert = "<label for=\"decreasing-power-input\">Power: </label>"
        + "<input type=\"number\" id=\"decreasing-power-input\" value=\"1\"/>"
        + "<br/>"
        + "<select id='size-step-direction-selector'>"
            + "<option>Increase Size</option>"
            + "<option>Decrease Size</option>"
        + "</select>"
        + "<br/>"
        + "Use short strokes to draw with this brush.<br />The more you hold the mouse button, the smaller will the brush size get.";
    updateToolOptions(header, htmlToInsert);
}

function loadSmoothPenContextMenu() {
    var header = "Smooth Pen"
    var htmlToInsert = "<label for=\"min-distance-input\">Minimum distance between points: </label>"
        + "<input type=\"number\" id=\"min-distance-input\" value=\"50\"/>";
    updateToolOptions(header, htmlToInsert);
}

function loadPressureBrushContextMenu() {
    var header = "Pressure Brush"
    var htmlToInsert = "<label for=\"pressure-change-speed-input\">Change speed: </label>"
        + "<input type=\"number\" id=\"pressure-change-speed-input\" value=\"2\"/><br/>"
        + "<label for=\"pressure-type-selector\">Change speed: </label>"
        + "<select id='pressure-type-selector'>"
            + "<option>Increase Pressure</option>"
            + "<option>Decrease Pressure</option>"
        + "</select>"
        + "<br/>"
        + "<input type=\"checkbox\" id=\"change-reds-selector\" checked/>"
        + "<label for=\"change-reds-selector\">Change Reds: </label>"
        + "<br/>"
        + "<input type=\"checkbox\" id=\"change-greens-selector\" checked/>"
        + "<label for=\"change-greens-selector\">Change Greens: </label>"
        + "<br/>"
        + "<input type=\"checkbox\" id=\"change-blues-selector\" checked/>"
        + "<label for=\"change-blues-selector\">Change Blues: </label>"
        + "<br/>"
        + "<input type=\"checkbox\" id=\"change-opacity-selector\" checked/>"
        + "<label for=\"change-opacity-selector\">Change Opacity: </label>"
        + "<br/>"
        + "Use short strokes to draw with this brush.<br />The more you hold the mouse button, the bigger will the brush size get."
        + "<br/>";
    updateToolOptions(header, htmlToInsert);
}

function loadArtisticRubberContextMenu() {
    var header = "Artistic Rubber"
    var htmlToInsert = "Click, or drag to clear an area of the picture.<br/>Adjust the line width to change the rubber size.";
    updateToolOptions(header, htmlToInsert);
}