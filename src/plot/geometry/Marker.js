define([
    "dojo/_base/declare",
    "../plotUtils",
    "./PlotGeometry"
], function (declare, plotUtils, PlotGeometry) {
    return declare([PlotGeometry], {
        constructor: function (points) {
            this.type = "point";
            this.plotType = "marker";
            this.fixPointCount = 1;
            this.setPoints(points);
        },
        generate: function () {
            var pnt = this.points[0];
            this.x = pnt[0];
            this.y = pnt[1];
        }
    });
});


