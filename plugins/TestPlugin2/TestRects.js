var rectMakerOnClick = makeToolObj("Click Rect", makeRectOnClick, null, null, loadClickRectContextMenu, 3);
var rectMakerOnDrag = makeToolObj("Drag Rect", startDragRect, null, drawDraggedRect, loadDragRectContextMenu);

var testPluginTools = [rectMakerOnClick, rectMakerOnDrag];
var testPluginToolBox = makeToolBoxObj(testPluginTools);

var testRects = makePluginObj("testRects", testPluginToolBox);
addPluginObj(testRects);

function makeRectOnClick(event) {
    var width = document.getElementById("rect-width-input").value;
    var height = document.getElementById("rect-haight-input").value;

    currentContext.beginPath();
    currentContext.lineWidth = currentLineWidth;
    currentContext.fillStyle = currentFillColor;
    currentContext.strokeStyle = currentStrokeColor;

    currentContext.rect(
        mousePositionX - width / 2,
        mousePositionY - height / 2,
        width, 
        height);

    currentContext.fill();
    currentContext.stroke();
}

function startDragRect() {
    updateToolOptions("DrawRect Options", "Great! Now drag around and release.");
    customPositionX = mousePositionX;
    customPositionY = mousePositionY;
}

function drawDraggedRect() {
    updateToolOptions("DrawRect Options", "Great! Now drag around and release.");
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

    loadDragRectContextMenu()
}

function loadClickRectContextMenu() {
    var header = "ClickRect Options"
    var htmlToInsert = 
        "<label for=\"rect-width-input\">Width: </label>"
        + "<input type=\"number\" id=\"rect-width-input\" value=\"80\"/>"
        + "<label for=\"rect-haight-input\">Haight: </label>"
        + "<input type=\"number\" id=\"rect-haight-input\" value=\"50\"/>";
    updateToolOptions(header, htmlToInsert);
}

function loadDragRectContextMenu() {
    var header = "DrawRect Options"
    var htmlToInsert = "Click, drag and release, to make a rectangle."
    updateToolOptions(header, htmlToInsert);
}