define(["./PlotDraw",
    "esri/graphic",
    "esri/symbols/jsonUtils"
], function (PlotDraw, Graphic, jsonUtils) {
    var decoder = {};
    decoder.fromJson = function (plotJson, symbolJson) {
        var plot = PlotDraw.createPlot(plotJson.plotType, plotJson.points, plotJson.wkid);
        var symbol = jsonUtils.fromJson(symbolJson);
        if (plot && symbol) {
            return new Graphic(plot.toGeometry(), symbol);
        }
    }
    return decoder;
});