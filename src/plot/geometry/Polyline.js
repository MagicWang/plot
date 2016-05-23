define([
    "dojo/_base/declare",
    "../plotUtils",
    "./PlotGeometry"
], function (declare, plotUtils, PlotGeometry) {
    return declare([PlotGeometry], {
        constructor: function (points) {
            this.type = "polyline";
            this.setPoints(points);
        },
        generate: function () {
            var count = this.getPointCount();
            if (count < 2) {
                return;
            }
            this.paths = this.points;
        }
    });
});
