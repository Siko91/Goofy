var roundBrush = makeToolObj("Round Brush", null, roundBrushDraw, null, loadRoundBrushContextMenu, 100);

var ArtisticStrokesTools = [roundBrush];
var ArtisticStrokesToolBox = makeToolBoxObj(ArtisticStrokesTools);

var ArtisticStrokesPlugin = makePluginObj("Artistic Strokes", ArtisticStrokesToolBox);
addPluginObj(ArtisticStrokesPlugin);


function roundBrushDraw() {
    if (mousePressed) {
        drawLayerOfRoundBrushLine(currentLineWidth, setOpacityOfColor(currentStrokeColor, 0.01));
        drawLayerOfRoundBrushLine(currentLineWidth * 0.6, setOpacityOfColor(currentStrokeColor, 0.02));
        drawLayerOfRoundBrushLine(currentLineWidth * 0.4, setOpacityOfColor(currentStrokeColor, 0.02));
        drawLayerOfRoundBrushLine(currentLineWidth * 0.2, setOpacityOfColor(currentStrokeColor, 0.02));
        drawLayerOfRoundBrushLine(currentLineWidth * 0.2, setOpacityOfColor(currentStrokeColor, 0.05));
        drawLayerOfRoundBrushLine(currentLineWidth * 0.1, setOpacityOfColor(currentStrokeColor, 0.01));
    }
    function drawLayerOfRoundBrushLine(lineWidth, lineColor) {
        currentContext.lineWidth = lineWidth;
        currentContext.lineCap = 'round';
        currentContext.strokeStyle = lineColor;
        currentContext.beginPath();
        currentContext.moveTo(prevousPosionX, prevousPosionY);
        currentContext.lineTo(mousePosionX, mousePosionY);
        currentContext.stroke();
        currentContext.closePath();
    }
    function setOpacityOfColor(color, newOpacity) {
        var startIndex = color.lastIndexOf(",") + 1;
        var opacity = parseFloat(color.substring(startIndex, color.length - 1));
        newOpacity = newOpacity * opacity;
        color = color.split("");
        color = color.splice(0, startIndex).join("") + newOpacity + ")";
        return color;
    }
}

function loadRoundBrushContextMenu() {
    var header = "Round Brush"
    var htmlToInsert = "Just draw as you see fit";
    updateToolOptions(header, htmlToInsert);
}