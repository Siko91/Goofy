var plugins = [],
    currentPlugin;

var layers = {},
    layerNames = [],
    canvasContexts = {};

// initialize functions (used only once)

function fillGeneralOptionsDiv() {

    function makeGroup($nodes) {
        return $('<div />')
            .addClass('group')
            .append($nodes);
    }
    
    var $generalOptionsFragment = $(document.createDocumentFragment());

    $('<header />')
        .append('<h1>general options</h1>')
        .appendTo($generalOptionsFragment);

    $('<span id="mouse-position-tracker" />')
        .appendTo($generalOptionsFragment);

    var $lineWidthLabel = $('<label />')
        .append(' Line Width: ')
        .attr('for', 'line-width-input');
    var $lineWidthInput = $('<input />')
        .attr('id', 'line-width-input')
        .attr('type', 'number')
        .attr('min', '0')
        .attr('value', '1')
        .change(updateCurrentSettings);
    $generalOptionsFragment.append(makeGroup([$lineWidthLabel, $lineWidthInput]))


    var $strokeColorLabel = $('<label />')
        .append(' Stroke Color: ')
        .attr('for', 'stroke-color-input');
    var $strokeColorInput = $('<input />')
        .attr('id', 'stroke-color-input')
        .attr('type', 'color')
        .attr('value', '#000000')
        .change(updateCurrentSettings);
    $generalOptionsFragment.append(makeGroup([$strokeColorLabel, $strokeColorInput]))


    var $fillColorLabel = $('<label />')
        .append(' Fill Color: ')
        .attr('for', 'fill-color-input');
    var $fillColorInput = $('<input />')
        .attr('id', 'fill-color-input')
        .attr('type', 'color')
        .attr('value', '#ff0000')
        .change(updateCurrentSettings);
    $generalOptionsFragment.append(makeGroup([$fillColorLabel, $fillColorInput]))


    var $strokeOpacityLabel = $('<label />')
        .append(' Stroke Opacity: ')
        .attr('for', 'stroke-opacity-input');
    var $strokeOpacityInput = $('<input />')
        .attr('id', 'stroke-opacity-input')
        .attr('type', 'range')
        .attr('min', '0')
        .attr('max', '100')
        .attr('value', '100')
        .attr('step', '1')
        .change(updateCurrentSettings);
    $generalOptionsFragment.append(makeGroup([$strokeOpacityLabel, $strokeOpacityInput]))

    var $fillOpacityLabel = $('<label />')
        .append(' Fill Opacity: ')
        .attr('for', 'fill-opacity-input');
    var $fillOpacityInput = $('<input />')
        .attr('id', 'fill-opacity-input')
        .attr('type', 'range')
        .attr('min', '0')
        .attr('max', '100')
        .attr('value', '100')
        .attr('step', '1')
        .change(updateCurrentSettings);
    $generalOptionsFragment.append(makeGroup([$fillOpacityLabel, $fillOpacityInput]))

    var $pluginSelectorLabel = $('<label />')
        .append(' Active Plugin: ')
        .attr('for', 'plugin-selector');
    var $pluginSelector = $('<select />')
        .attr('id', 'plugin-selector')
        .change(updateCurrentPlugin);
    $generalOptionsFragment.append(makeGroup([$pluginSelectorLabel, $pluginSelector]))

    $('<button />')
        .append('Clear Layer')
        .click(clearCurrentLayer)
        .appendTo($generalOptionsFragment);

    $('<button />')
        .append('Get Image')
        .click(getCanvasImage)
        .appendTo($generalOptionsFragment);

    $('#general-options').append($generalOptionsFragment);
}

function fillPluginSelector() {
    var $pluginSelector = $("#plugin-selector");
    for (var i = 0; i < plugins.length; i++) {
        $('<option/>')
            .append(plugins[i].name)
            .appendTo($pluginSelector);
    }
}

// common functions (used all the time)

function getCanvasImage() {
    var $combinedLayer = $('<canvas />')
        .css('padding', '0')
        .css('margin', '0')
        .css('border', '0px none')
        .css('background', 'none repeat scroll 0% 0% transparent')
        .css('position', 'absolute')
        .css('top', '0px')
        .css('left', '0px')
        .attr('width', '800')
        .attr('height', '500');

    var combinedContext = $combinedLayer[0].getContext('2d');

    for (var i = layerNames.length-1; i >= 0; i--) {
        combinedContext.drawImage(layers[layerNames[i]], 0, 0);
    }
    window.open($combinedLayer[0].toDataURL());
}

function clearCurrentLayer() {
    currentContext.clearRect(0, 0, currentLayer.width, currentLayer.height);
}

function updateCurrentSettings() {
    currentLineWidth = $("#line-width-input").val();

    var strokeOpacity = $("#stroke-opacity-input").val() / 100;
    var fillOpacity = $("#fill-opacity-input").val() / 100;

    var strokeColorInput = $("#stroke-color-input").val().toLowerCase();
    var fillColorInput = $("#fill-color-input").val().toLowerCase();

    function ConvertToRGBA(color, opacity) {
        var hexSymbols = [1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
        var red = (hexSymbols.indexOf(color[1]) + 1) * 16 + (hexSymbols.indexOf(color[2]) + 1);
        var green = (hexSymbols.indexOf(color[3]) + 1) * 16 + (hexSymbols.indexOf(color[4]) + 1);
        var blue = (hexSymbols.indexOf(color[5]) + 1) * 16 + (hexSymbols.indexOf(color[6]) + 1);

        return "rgba(" + red + "," + green + "," + blue + "," + opacity + ")"
    }

    currentStrokeColor = ConvertToRGBA(strokeColorInput, strokeOpacity);
    currentFillColor = ConvertToRGBA(fillColorInput, fillOpacity);
}

function updateCurrentPlugin() {
    var selectedIndex = $("#plugin-selector")[0].selectedIndex;

    currentPlugin = plugins[selectedIndex];
    currentTool = currentPlugin.toolBox.tools[0];
    updateCurrentTool(null, currentPlugin.toolBox.tools[0].name)
}

function updateCurrentTool(ev, toolName) {
    if (!toolName) {
        toolName = this.value;
    }

    var tools = currentPlugin.toolBox.tools;
    for (var i = 0; i < tools.length; i++) {
        if (tools[i].name === toolName) {

            // clear custum vars
            customPositionX = NaN;
            customPositionY = NaN;
            customVariable = undefined;

            // update the tool
            currentTool = tools[i];
            LoadToolBox();
            $("#tool-options").append("No optins available for this tool");
            
            // change line width
            if (typeof currentTool.initialLineWidth === "number"
                && currentTool.initialLineWidth > 0) {
                $("#line-width-input").val(currentTool.initialLineWidth);
                updateCurrentSettings();
            }

            // onToolChoice
            if (currentTool.onToolChoice !== null && currentTool.onToolChoice !== undefined) {
                currentTool.onToolChoice();
            }
        }
    }
}

function LoadToolBox() {
    var $toolBox = $("#tool-box");

    var $toolsFragment = $(document.createDocumentFragment());

    $('<header />')
        .append('<h2>' + currentPlugin.name + '</h2>')
        .appendTo($toolsFragment);

    for (var i = 0; i < currentPlugin.toolBox.tools.length; i++) {
        var tool = currentPlugin.toolBox.tools[i];

        var $toolBtn = $('<button />')
            .append(tool.name)
            .val(tool.name)
            .click(updateCurrentTool)
            .appendTo($toolsFragment);

        if (tool === currentTool) {
            $toolBtn.addClass('currentTool');
        }
    }

    $toolBox.find('*').remove();
    $toolBox.append($toolsFragment);
}

function updeteLayerControlDiv() {

    var $layerControlFragment = $(document.createDocumentFragment());

    $('<header />')
        .append('<h1>layer options</h1>')
        .appendTo($layerControlFragment);

    var $table = $('<table />')
        .appendTo($layerControlFragment);
    var $thead = $('<thead />')
        .appendTo($table);
    var $thRow = $('<tr />')
        .appendTo($thead);

    $('<th />')
        .append('Select & Move Top')
        .appendTo($thRow);
    $('<th />')
        .append('Name')
        .appendTo($thRow);
    $('<th />')
        .append('Delete')
        .appendTo($thRow);

    for (var index = 0; index < layerNames.length; index++) {
        var layerName = layerNames[index];

        var $tRow = $('<tr />')
        .appendTo($table);

        var $selectBtn = $('<button />')
            .val(layerName)
            .click(updateCurrentLayer)
            .append('Select');

        var $deleteBtn = $('<button />')
            .val(layerName)
            .click(deleteLayer)
            .append('Delete');

        $('<td />')
            .append($selectBtn)
            .appendTo($tRow);
        $('<td />')
            .append(layerName)
            .appendTo($tRow);
        $('<td />')
            .append($deleteBtn)
            .appendTo($tRow);
    }

    $('<input />')
        .attr('id', 'new-layer-name-input')
        .attr('type', 'text')
        .attr('placeholder', 'Name of new layer')
        .appendTo($layerControlFragment);

    $('<button />')
        .append('Add new layer')
        .click(addNewLayer)
        .appendTo($layerControlFragment);

    $("#layer-options").find('*').remove();
    $("#layer-options").append($layerControlFragment);
}

function addNewLayer(ev, layerName) {
    if (layerName === undefined) {
        layerName = $("#new-layer-name-input").val();
    }

    if (layers[layerName] === undefined) {
        var $newLayer = $('<canvas />')
        .attr('id', layerName + "-canvas")
        .css('padding', '0')
        .css('margin', '0')
        .css('border', '0px none')
        .css('background', 'none repeat scroll 0% 0% transparent')
        .css('position', 'absolute')
        .css('top', '0px')
        .css('left', '0px')
        .attr('width', '800')
        .attr('height', '500')
        .appendTo("#canvas-container");

        layers[layerName] = $newLayer[0];
        layerNames.push(layerName);
        canvasContexts[layerName] = layers[layerName].getContext('2d');

        updeteLayerControlDiv();
    }
    else {
        alert("The name is already taken");
    }
}

function MoveLayerToTop(layerName) {
    if (!layerName) {
        layerName = this.value();
    }
    
    // in names
    var indexOfLayerName = layerNames.indexOf(layerName);
    for (var i = indexOfLayerName; i > 0; i--) {
        layerNames[i] = layerNames[i - 1];
    }
    layerNames[0] = layerName;

    // in html
    var layerToMove = layers[layerName];
    document.getElementById("canvas-container").removeChild(layerToMove);
    document.getElementById("canvas-container").appendChild(layerToMove);
}

function updateCurrentLayer(ev, layerName) {
    if (!layerName) {
        layerName = this.value;
    }
    if (layers[layerName] !== undefined) {
        MoveLayerToTop(layerName);
        currentLayer = layers[layerName];
        currentContext = canvasContexts[layerName];
        updeteLayerControlDiv();
    }
}

function deleteLayer(ev, layerToDelete) {
    if (!layerToDelete) {
        layerToDelete = this.value;
    }
    if (layerNames.length > 1) {
        var layerNameIndex = layerNames.indexOf(layerToDelete);
        layerNames.splice(layerNameIndex, 1);
        if (currentLayer === layers[layerToDelete]) {
            updateCurrentLayer(layerNames[0]);
        }
        $(layers[layerToDelete]).remove();
        layers[layerToDelete] = undefined;
        canvasContexts[layerToDelete] = undefined;

        updeteLayerControlDiv();
    }
    else {
        alert("Can't delete the last layer.")
    }
}

function handleMouseMove(event) {
    prevousPositionX = mousePositionX;
    prevousPositionY = mousePositionY;

    var hiddenLeftPixels = document.all ? iebody.scrollLeft : pageXOffset;
    var hiddenTopPixels = document.all ? iebody.scrollTop : pageYOffset;

    mousePositionX = event.clientX
        - document.getElementById("canvas-container").offsetLeft
        + hiddenLeftPixels;
    mousePositionY = event.clientY
        - document.getElementById("canvas-container").offsetTop
        + hiddenTopPixels;

    $("#mouse-position-tracker").html('');
    $("#mouse-position-tracker").append(mousePositionX + ", " + mousePositionY);

    if (currentTool.onMouseMove !== null && currentTool.onMouseMove !== undefined) {
        currentTool.onMouseMove();
    }
}
function handleMouseUpInWindow() {
    mousePressed = false;
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

    addNewLayer(null, "Layer1");
    updateCurrentLayer(null, "Layer1");

    document.getElementById("canvas-container").onmousemove = handleMouseMove;
    document.getElementById("canvas-container").onmouseup = handleMouseUp;
    document.getElementById("canvas-container").onmousedown = handleMouseDown;

    window.onmouseup = handleMouseUpInWindow;
}