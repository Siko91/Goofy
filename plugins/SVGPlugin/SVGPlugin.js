var SimpleSVGAnimation = makeToolObj("SVG Animation", null, null, null, startSVGAnimation);

var SVGPluginTools = [SimpleSVGAnimation];
var SVGPluginToolBox = makeToolBoxObj(SVGPluginTools);

var SVGPlugin = makePluginObj("SVG Plugin", SVGPluginToolBox);
addPluginObj(SVGPlugin);

function animateTheSVG() {

}


function startSVGAnimation() {
    var header = "SVG Animation"
    var htmlToInsert = "Absolutly useless animation, but also a requirement for the project" + "<div id='svg-container' style='display: inline-block;'></div>";
    updateToolOptions(header, htmlToInsert);

    var paper = Raphael("svg-container", 400, 200);
    // will update
}