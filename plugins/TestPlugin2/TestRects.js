var rectMakerOnClick = makeToolObj("Click Rect", makeRectOnClick, null, null, loadClickRectContextMenu);
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
        mousePosionX - width / 2,
        mousePosionY - height / 2,
        width, 
        height);

    currentContext.fill();
    currentContext.stroke();
}

function startDragRect() {
    updateToolOptions("DrawRect Options", "Great! Now drag around and release.");
    customPositionX = mousePosionX;
    customPositionY = mousePosionY;
}

function drawDraggedRect() {
    updateToolOptions("DrawRect Options", "Great! Now drag around and release.");
    var width = Math.abs(customPositionX - mousePosionX);
    var height = Math.abs(customPositionY - mousePosionY);

    if (customPositionX > mousePosionX) {
        customPositionX = mousePosionX;
    }
    if (customPositionY > mousePosionY) {
        customPositionY = mousePosionY;
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
    header = "ClickRect Options"
    htmlToInsert = 
        "<label for=\"rect-width-input\">Width: </label>"
        + "<input type=\"number\" id=\"rect-width-input\" value=\"50\"/>"
        + "<label for=\"rect-haight-input\">Haight: </label>"
        + "<input type=\"number\" id=\"rect-haight-input\" value=\"20\"/>";
    updateToolOptions(header, htmlToInsert);
}

function loadDragRectContextMenu() {
    header = "DrawRect Options"
    htmlToInsert = "Click, drag and release, to make a rectangle."
    updateToolOptions(header, htmlToInsert);
}