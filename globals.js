// current settings

var mousePosionX; // will be initialized in the engine. A Number
var mousePosionY; // will be initialized in the engine. A Number

var currentLayer; // will be initialized in the engine. A Canvas

var currentLineWidth; // will be initialized in the engine. A number
var currentStrokeColor; // will be initialized in the engine. A color string
var currentFillColor; // will be initialized in the engine. A color string

var currentTool; // will be initialized in the engine. A Tool Object

// objectMakers

var makeToolObj = function(name, onMouseDawn, onMouseMove, onMouseUp, onToolChoice) {
	return {
		name: name,
		onMouseDown: onMouseDawn, // a function that will be called on mouse button press
		onMouseMove: onMouseMove, // a function that will be called on mouse move
		onMouseUp: onMouseUp, // a function that will be called on mouse button release
		onToolChoice: onToolChoice // a function that will be called when the tool is chosen. Used to update the innerHTML of the context menu
	};
}

function makeToolBoxObj(tools) {
	return {
		x: 10,
		y: 10,
		width: 100,
		height: 250,
		tools: tools // array of tool Objects made with the makeToolObj() function
	};
}

function makePluginObj(name, toolbox) {
    return {
        name: name,
        toolBox: toolbox // toolbox made with the makeToolBoxObj() function
    };
}

function addPluginObj(plugin) {
    plugins.push(plugin); // plugins is an Array. It is not defined in this file, but it will be defined before this function is actually used.
}

function updateToolOptions(header, htmlContent) {
    htmlContent = "<header><h1>" + header + "</h1></header>" + htmlContent;
    document.getElementById("tool-options").innerHTML = htmlContent;
}