var colorPicker = makeToolObj("colorPicker", pickColor, null, null, loadColorPickerContextMenu, 1);

var colorPickerTools = [colorPicker];
var colorPickerToolBox = makeToolBoxObj(colorPickerTools);

var colorPickerPlugin = makePluginObj("colorPicker", colorPickerToolBox);
addPluginObj(colorPickerPlugin);

function pickColor()
{
	var currentPixel = currentContext.getImageData(mousePosionX, mousePosionY, 1, 1).data;
	var hexColor = '#' + componentToHex(currentPixel[0]) + componentToHex(currentPixel[1]) + componentToHex(currentPixel[2]); //convertRgbToHex(currentPixel[0], currentPixel[1], currentPixel[2]);
	var colorField = document.getElementById('picked-color');
	colorField.value = hexColor;
}

function convertRgbToHex(r, g, b)
{
	return ((r << 16) | (g << 8) | b).toString(16);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function loadColorPickerContextMenu()
{
	var header = "Color Picker Options:"
    var htmlToInsert = '<label for="picked-color">Picked color: </label>'
        + '<input type="text" id="picked-color" />';
    updateToolOptions(header, htmlToInsert);
}