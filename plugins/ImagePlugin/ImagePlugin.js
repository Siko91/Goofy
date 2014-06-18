var insertImage = makeToolObj("Insert Image Tool", null, null, null, loadInsertImageContextMenu);

var imagePluginTools = [insertImage];
var imagePluginToolBox = makeToolBoxObj(imagePluginTools);

var imagePlugin = makePluginObj("Image Plugin", imagePluginToolBox);
addPluginObj(imagePlugin);

function insertImageBtnClicked() {
    var imageURL = $('#image-url-input').val();

    var imageX = parseInt($('#image-point-x-input').val());
    var imageY = parseInt($('#image-point-y-input').val());

    var imageWidth = parseInt($('#image-width-input').val());
    var imageHeight = parseInt($('#image-height-input').val());

    currentVariable = new Image();
    currentVariable.onload = function () {
        currentContext.drawImage(currentVariable, imageX, imageY, imageWidth, imageHeight);
    }
    currentVariable.src = imageURL;
}

function loadInsertImageContextMenu() {
    var header = "Insert Image Options:"

    var $wrapperOfImageMenu = $('<div />')

    $('<label />')
        .attr('for', 'image-url-input')
        .html('URL: ')
        .appendTo($wrapperOfImageMenu);
    $("<input />")
        .attr('id', 'image-url-input')
        .attr('placeholder', 'url to the specific image')
        .css('width', '350px')
        .appendTo($wrapperOfImageMenu);

    $('<br />')
        .appendTo($wrapperOfImageMenu);

    $('<label />')
        .attr('for', 'image-point-x-input')
        .html('X: ')
        .appendTo($wrapperOfImageMenu);
    $("<input />")
        .attr('id', 'image-point-x-input')
        .attr('type', 'number')
        .attr('min', '0')
        .attr('max', currentLayer.width)
        .attr('value', 0)
        .appendTo($wrapperOfImageMenu);

    $('<label />')
        .attr('for', 'image-point-y-input')
        .html('Y: ')
        .appendTo($wrapperOfImageMenu);
    $("<input />")
        .attr('id', 'image-point-y-input')
        .attr('type', 'number')
        .attr('min', '0')
        .attr('max', currentLayer.height)
        .attr('value', 0)
        .appendTo($wrapperOfImageMenu);


    $('<label />')
        .attr('for', 'image-width-input')
        .html('Width: ')
        .appendTo($wrapperOfImageMenu);
    $("<input />")
        .attr('id', 'image-width-input')
        .attr('type', 'number')
        .attr('min', '0')
        .attr('max', currentLayer.width)
        .attr('value', currentLayer.width)
        .appendTo($wrapperOfImageMenu);

    $('<label />')
        .attr('for', 'image-height-input')
        .html('Height: ')
        .appendTo($wrapperOfImageMenu);
    $("<input />")
        .attr('id', 'image-height-input')
        .attr('type', 'number')
        .attr('min', '0')
        .attr('max', currentLayer.height)
        .attr('value', currentLayer.height)
        .appendTo($wrapperOfImageMenu);

    $('<br />')
        .appendTo($wrapperOfImageMenu);

    var $btn = $('<button onclick="insertImageBtnClicked()" />')
        .html('Insert Image')
        .appendTo($wrapperOfImageMenu);

    updateToolOptions(header, $wrapperOfImageMenu.html());
}