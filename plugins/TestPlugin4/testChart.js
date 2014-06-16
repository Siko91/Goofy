
var testChartMaker = makeToolObj("Chart", getChartValue, null, null, loadChartContextMenu);

var testChartTools = [testChartMaker];
var testChartToolBox = makeToolBoxObj(testChartTools);

var testChartPlugin = makePluginObj("testChart", testChartToolBox);
addPluginObj(testChartPlugin);

var chartValues = [];
function getChartValue() {
    var number = document.getElementById('chartValues').value | 0;
    if (number > 0 && number <= 100) {
        chartValues.push(number);
    }
    currentContext.clearRect(30, 30, 500, 500);
    var chart = new Chart(chartValues);
    chart.drawChart();
}

function Chart(values) {
    this.x = 30;
    this.y = 30;
    this.arrayWithValues = values;
    var maxValue = maximalValue(values);
    var level = ((200 / maxValue) | 0) * 2;
    var valuesCount = values.length * 2;

    this.drawChart = function () {
        if (this.arrayWithValues.length > 0) {
            currentContext.beginPath();
            currentContext.moveTo(this.x, this.y);
            currentContext.lineTo(this.x, this.y + level * maxValue);
            currentContext.lineTo(this.x + level * maxValue, this.y + level * maxValue);
            currentContext.stroke();
            currentContext.beginPath();
            currentContext.moveTo(this.x, this.y);
            currentContext.lineTo(this.x - 10, this.y + 10);
            currentContext.moveTo(this.x, this.y);
            currentContext.lineTo(this.x + 10, this.y + 10);
            currentContext.stroke();
            currentContext.beginPath();
            currentContext.moveTo(this.x + level * maxValue, this.y + level * maxValue);
            currentContext.lineTo(this.x + level * maxValue - 10, this.y + level * maxValue - 10);
            currentContext.moveTo(this.x + level * maxValue, this.y + level * maxValue);
            currentContext.lineTo(this.x + level * maxValue - 10, this.y + level * maxValue + 10);
            currentContext.stroke();
            var currentX = 30;
            for (var j = 0; j < this.arrayWithValues.length; j++) {
                currentContext.fillStyle = getRondomColor();
                currentContext.fillRect(this.x + currentX, this.y, 25, this.arrayWithValues[j] * level);
                currentContext.fillStyle = '#fff';
                currentContext.font = '12pt Calibri';
                currentContext.fillText(this.arrayWithValues[j].toString(), this.x + currentX, this.y + level * this.arrayWithValues[j]);
                currentContext.stroke();
                currentX += 25;
            }
        }

    }
    function maximalValue(val) {
        var max = values[0];
        for (var i = 0; i < val.length; i++) {
            if (val[i] > max) {
                max = values[i];
            }
        }
        return max;
    }
    function getRondomColor() {
        var red = Math.random() * 256 | 0;
        var green = Math.random() * 256 | 0;
        var blue = Math.random() * 256 | 0;
        var color = 'rgb(' + red + ',' + green + ',' + blue + ')';
        return color;
    }
}

function loadChartContextMenu() {
    var header = "Enter Chart Value"
    var htmlToInsert =
        "<label for=\"chartValues\">Rect Char</label>"+
        "<input type=\"number\" max=\"100\" id=\"chartValues\"/>";
        
    updateToolOptions(header, htmlToInsert);
}