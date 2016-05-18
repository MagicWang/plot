define([
    "dojo/_base/declare",
    "../plotTypes",
    "../plotUtils",
    "./Geometry"
], function (declare, plotTypes, plotUtils, Geometry) {
    return declare([Geometry], {
        constructor: function (points) {
            this.type = plotTypes.CURVE;
            this.geometryType = "polyline";
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