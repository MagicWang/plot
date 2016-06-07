define(["./PlotDraw",
    "esri/graphic",
    "esri/symbols/jsonUtils"
], function (PlotDraw, Graphic, jsonUtils) {
    var decoder = {};
    decoder.fromJson = function (json) {
        if (json && json.plot && json.symbol) {
            var plot = PlotDraw.createPlot(json.plot.plotType, json.plot.points, json.plot.wkid);
            var symbol = jsonUtils.fromJson(json.symbol);
            if (plot && symbol) {
                var graphic = new Graphic(plot.toGeometry(), symbol);
                graphic.plot = plot;
                return graphic;
            }
        }
    }
    return decoder;
});