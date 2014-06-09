var SimpleSVGAnimation = makeToolObj("SVG Animation", null, null, null, startSVGAnimation);

var SVGPluginTools = [SimpleSVGAnimation];
var SVGPluginToolBox = makeToolBoxObj(SVGPluginTools);

var SVGPlugin = makePluginObj("SVG Plugin", SVGPluginToolBox);
addPluginObj(SVGPlugin);

function animateTheSVG(event) {
    var hiddenLeftPixels = document.all ? iebody.scrollLeft : pageXOffset;
    var hiddenTopPixels = document.all ? iebody.scrollTop : pageYOffset;
    customPositionX = event.clientX
        - document.getElementById("svg-container").offsetLeft
        + hiddenLeftPixels;
    customPositionY = event.clientY
        - document.getElementById("svg-container").offsetTop
        + hiddenTopPixels;
    document.getElementById("mouse-position-tracker").innerHTML = customPositionX + ", " + customPositionY;

    positionEye(customVariable.leftEye, 5, 115, 190);
    positionEye(customVariable.rightEye, 8, 225, 205);

    customVariable.fly.attr({
        x: customPositionX-15,
        y: customPositionY-15
    });

    function positionEye(eye, maxDistance, centerX, centerY) {
        var percentageOfDistance = maxDistance / getDistanceBetwenn2DPoints(centerX, centerY, customPositionX, customPositionY);

        if (customPositionX > centerX) {
            eye.attr({
                cx: centerX + (customPositionX - centerX) * percentageOfDistance
            });
        }
        else {
            eye.attr({
                cx: centerX - (centerX - customPositionX) * percentageOfDistance
            });
        }

        if (customPositionY < centerY) {
            eye.attr({
                cy: centerY + (customPositionY - centerY) * percentageOfDistance
            });
        }
        else {
            eye.attr({
                cy: centerY - (centerY - customPositionY) * percentageOfDistance
            });
        }
    }
}

function startSVGAnimation() {
    var header = "SVG Animation"
    var htmlToInsert = "Absolutly useless animation, but also a requirement for the project"
    + "<div id='svg-container' style='display: inline-block;'>"
    + "</div>";
    updateToolOptions(header, htmlToInsert);

    customVariable = { 
        face: {},
        leftEye: {},
        rightEye: {},
        fly: {}
    };

    var paper = Raphael("svg-container", 500, 400);

    paper.rect(0, 0, 500, 400).attr({
        fill: "#dddddd"
    });

    customVariable.leftEye = paper.circle(115, 190, 4).attr({
        fill: '#000000'
    });

    customVariable.rightEye = paper.circle(225, 205, 7).attr({
        fill: '#000000'
    });

    customVariable.face = paper.image("plugins/SVGPlugin/face.svg", 0, 0, 500, 400);

    paper.text(200, 50, "Do a proper SVG animation?").attr({
        'font-family': 'Arial',
        'font-size': '25',
        'fill': '#ff0000'
    });
    paper.text(80, 350, "NO!").attr({
        'font-family': 'Arial',
        'font-size': '55',
        fill: '#ff0000'
    });

    document.getElementById('svg-container').onmousemove = animateTheSVG;

    customVariable.fly = paper.image("plugins/SVGPlugin/fly.svg", 0, 0, 50, 40);
}