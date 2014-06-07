var plugins = [],
    currentPlugin;

var layers = {},
    layerNames = [],
    canvasContexts = {};

// initialize functions (used only once)
function fillGeneralOptionsDiv() {
    document.getElementById("general-options").innerHTML
        += "<header><h1>general options</h1></header>"
        + "<span id=\"mouse-position-tracker\"></span>"
        + "<div class=\"group\"><label for=\"line-width-input\">Line width:</label>"
        + "<input type=\"number\" id=\"line-width-input\" onchange=\"updateCurrentSettings()\" value=\"3\"/></div>"
        + "<div class=\"group\"><label for=\"stroke-color-input\">Stroke:</label>"
        + "<input type=\"color\" name=\"name\" id=\"stroke-color-input\" onchange=\"updateCurrentSettings()\" /></div>"
        + "<div class=\"group\"><label for=\"fill-color-input\">Fill:</label>"
        + "<input type=\"color\" name=\"name\" id=\"fill-color-input\" value=\"#FFFFFF\" onchange=\"updateCurrentSettings()\" /></div>"
        + "<div class=\"group\"><label for=\"plugin-selector\">Active Plugin: </label>"
        + "<select id=\"plugin-selector\" onchange=\"updateCurrentPlugin()\"></select></div>"
        + "<button onclick=\"getImageButtonClicked()\" >Get Image</button>";
}

function fillPluginSelector() {
    var pluginSelector = document.getElementById("plugin-selector");
    pluginSelector.innerHTML = "";
    for (var i = 0; i < plugins.length; i++) {
        pluginSelector.innerHTML += "<option>" + plugins[i].name + "</option>";
    }
}

// common functions (used all the time)
function getCanvasImage() {
    alert("not implemented yet!");
}

function updateCurrentSettings() {
    currentLineWidth = document.getElementById("line-width-input").value;
    currentStrokeColor = document.getElementById("stroke-color-input").value;
    currentFillColor = document.getElementById("fill-color-input").value;
}

function updateCurrentPlugin() {
    var selectedIndex = document.getElementById("plugin-selector").selectedIndex;

    currentPlugin = plugins[selectedIndex];
    currentTool = currentPlugin.toolBox.tools[0];
    updateCurrentTool(currentPlugin.toolBox.tools[0].name)
}

function updateCurrentTool(name) {
    var tools = currentPlugin.toolBox.tools;
    for (var i = 0; i < tools.length; i++) {
        if (tools[i].name === name) {
            currentTool = tools[i];
            LoadToolBox();
            document.getElementById("tool-options").innerHTML = "No optins available for this tool";
            if (currentTool.onToolChoice !== null && currentTool.onToolChoice !== undefined) {
                currentTool.onToolChoice();
            }
        }
    }
}

function LoadToolBox() {
    var toolBox = document.getElementById("tool-box");
    var htmlContent = "<header><h2>" + currentPlugin.name + "</h2></header>";

    for (var i = 0; i < currentPlugin.toolBox.tools.length; i++) {
        var tool = currentPlugin.toolBox.tools[i];
        htmlContent += "<button onclick=\"updateCurrentTool('" + tool.name + "')\" "
            + ((tool===currentTool)? "class=\"currentTool\"" : "")
            + " >"
            + tool.name
            + "</button>";
    }

    toolBox.innerHTML = htmlContent;
}

function updeteLayerControlDiv() {
    var htmlContent = "<header><h1>layer options</h1></header>"
    + "<table><thead><tr>"
    + "<th>Select & Move Top</th>"
    + "<th>Layer Name</th>"
    + "<th>Delete</th>"
    + "</tr></thead><tbody>"

    for (var index = 0; index < layerNames.length; index++) {
        var layerName = layerNames[index];
        
        htmlContent +=
            "<tr>"
                + "<td>"
                    + "<button "
                        + "onClick=\"updateCurrentLayer('" + layerName + "')\" "
                        + (layers[layerName] === currentLayer ? "checked" : "")
                        + ">Select</button></td>"
    		    + "<td>" + layerName + "</td>"
    		    + "<td>"
                    + "<button "
                        + "onclick=\"deleteLayer('" + layerName + "')\" >Delete</button>" + "</td>"
    		+ "</tr>";
    }
    htmlContent += "</tbody></table><br/><br/>"
    + "<input type=\"text\" placeholder=\"\" id=\"new-layer-name-input\"/>"
    + "<button onclick=\"addNewLayer()\" >Add new layer</button>";

    document.getElementById("layer-options").innerHTML = htmlContent;
}

function addNewLayer(layerName) {
    if (layerName === undefined) {
        layerName = document.getElementById("new-layer-name-input").value;
    }

    if (layers[layerName] === undefined) {
        document.getElementById("canvas-container").innerHTML
            += "<canvas id=\"" + layerName + "-canvas\""
            + "style=\"padding: 0px; margin: 0px; border: 0px none; background: none repeat scroll 0% 0% transparent; position: absolute; top: 0px; left: 0px;\" "
            + "width='800' height='500'>";
        
        layers[layerName] = document.getElementById(layerName + "-canvas");
        layerNames.push(layerName);
        canvasContexts[layerName] = layers[layerName].getContext('2d');

        updeteLayerControlDiv();
    }
    else {
        alert("The name is already taken");
    }
}

function MoveLayerToTop(layerName) {
    
    // in names
    var indexOfLayerName = layerNames.indexOf(layerName);
    for (var i = indexOfLayerName; i > 0; i--) {
        layerNames[i] = layerNames[i - 1];
    }
    layerNames[0] = layerName;

    // in html
//    var htmlContentToMove = layers[layerName].outerHTML;
//    document.getElementById("canvas-container").innerHTML
//        = document.getElementById("canvas-container").innerHTML.replace(htmlContentToMove, "")
//            + htmlContentToMove;
            
}

function updateCurrentLayer(layerName) {
    if (layers[layerName] !== undefined) {
        MoveLayerToTop(layerName);
        currentLayer = layers[layerName];
        currentContext = canvasContexts[layerName];
        updeteLayerControlDiv();
    }
}

function deleteLayer(layerToDelete) {
    if (layerNames.length > 1) {
        var layerNameIndex = layerNames.indexOf(layerToDelete);
        layerNames.splice(layerNameIndex, 1);
        if (currentLayer === layers[layerToDelete]) {
            updateCurrentLayer(layerNames[0]);
        }

        var textToRemove = layers[layerToDelete].outerHTML;
        document.getElementById("canvas-container").innerHTML 
            = document.getElementById("canvas-container").innerHTML.replace(textToRemove, "");

        layers[layerToDelete] = undefined;
        canvasContexts[layerToDelete] = undefined;

        updeteLayerControlDiv();
    }
    else {
        alert("Can't delete the last layer.")
    }
}

function handleMouseMove(event) {
    prevousPosionX = mousePosionX;
    prevousPosionY = mousePosionY;

    var hiddenLeftPixels = document.all ? iebody.scrollLeft : pageXOffset;
    var hiddenTopPixels = document.all ? iebody.scrollTop : pageYOffset;

    mousePosionX = event.clientX
        - document.getElementById("canvas-container").offsetLeft
        + hiddenLeftPixels;
    mousePosionY = event.clientY
        - document.getElementById("canvas-container").offsetTop
        + hiddenTopPixels;

    document.getElementById("mouse-position-tracker").innerHTML = mousePosionX + ", " + mousePosionY;
    if (currentTool.onMouseMove !== null && currentTool.onMouseMove !== undefined) {
        currentTool.onMouseMove();
    }
}

function handleMouseUp(event) {
    mousePressed = false;
    if (currentTool.onMouseUp !== null && currentTool.onMouseUp !== undefined) {
        currentTool.onMouseUp();
    }
}

function handleMouseDown(event) {
    mousePressed = true;
    if (currentTool.onMouseDown !== null && currentTool.onMouseDown !== undefined) {
        currentTool.onMouseDown();
    }
}

// initialize
window.onload = function () {
    fillGeneralOptionsDiv();
    fillPluginSelector();

    updateCurrentPlugin();
    updateCurrentSettings();

    addNewLayer("Layer1");
    updateCurrentLayer("Layer1");

    document.getElementById("canvas-container").onmousemove = handleMouseMove;
    document.getElementById("canvas-container").onmouseup = handleMouseUp;
    document.getElementById("canvas-container").onmousedown = handleMouseDown;
}