define([
    "dojo/_base/declare",
    "../plotUtils",
    "./PlotGeometry"
], function (declare, plotUtils, PlotGeometry) {
    return declare([PlotGeometry], {
        constructor: function (points) {
            this.type = "polyline";
            this.t = 0.3;
            this.setPoints(points);
        },
        generate: function () {
            var count = this.getPointCount();
            if (count < 2) {
                return;
            }
            if (count == 2) {
                this.paths = this.points;
            } else {
                this.paths = plotUtils.getCurvePoints(this.t, this.points);
            }
        }
    });
});