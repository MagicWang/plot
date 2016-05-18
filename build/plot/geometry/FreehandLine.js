define([
    "dojo/_base/declare",
    "../plotUtils",
    "./Geometry"
], function (declare, plotUtils, Geometry) {
    return declare([Geometry], {
        constructor: function (points) {
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
