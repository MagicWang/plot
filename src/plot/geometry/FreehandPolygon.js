define([
    "dojo/_base/declare",
    "../plotUtils",
    "./PlotGeometry"
], function (declare, plotUtils, PlotGeometry) {
    return declare([PlotGeometry], {
        constructor: function (points, wkid) {
            this.type = "polygon";
            this.plotType = "freehandpolygon";
            this.freehand = true;
            this.setPoints(points);
        },
        generate: function () {
            var count = this.getPointCount();
            if (count < 2) {
                return;
            }
            this.rings = this.points.concat([this.points[0]]);
        }
    });
});
