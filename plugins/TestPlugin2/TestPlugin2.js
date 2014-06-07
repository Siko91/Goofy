var rectMaker = makeToolObj("rectMaker", MakeRect, null, null, loadRectContextMenu);
var rectMaker2 = makeToolObj("rectMaker2", MakeRect, null, null, loadRectContextMenu);

var testPluginTools = [rectMaker, rectMaker2];
var testPluginToolBox = makeToolBoxObj(testPluginTools);

var testPlugin2 = makePluginObj("testPlugin2", testPluginToolBox);
addPluginObj(testPlugin2);

function MakeRect(event) {
    alert("not implemented");
}

function loadRectContextMenu() {
    header = "Rectangle Options"
    htmlToInsert = 
        "<label for=\"rect-width-input\">Width: </label>"
        + "<input type=\"number\" id=\"rect-width-input\" value=\"50\"/>";

        + "<label for=\"rect-haight-input\">Haight: </label>"
        + "<input type=\"number\" id=\"rect-haight-input\" value=\"20\"/>";
    updateToolOptions(header, htmlToInsert);
}