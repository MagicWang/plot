define([
    "dojo/_base/declare",
    "../plotTypes",
    "../plotUtils",
    "./Geometry"
], function (declare, plotTypes, plotUtils, Geometry) {
    return declare([Geometry], {
        constructor: function (points) {
            this.type = plotTypes.FREEHAND_LINE;
            this.geometryType = "polyline";
            this.freehand = true;
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
