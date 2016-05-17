define([
    "dojo/_base/declare",
    "../plotTypes",
    "../plotUtils",
    "./Geometry",
    "esri/geometry/Polyline"
], function (declare, plotTypes, plotUtils, Geometry, Polyline) {
    return declare([Polyline, Geometry], {
        constructor: function (points) {
            this.type = plotTypes.CURVE;
            this.t = 0.3;
            this.setPoints(points);
        },
        generate: function () {
            var count = this.getPointCount();
            if (count < 2) {
                return;
            }
            if (count == 2) {
                this.setCoordinates(this.points);
            } else {
                this.setCoordinates(plotUtils.getCurvePoints(this.t, this.points));
            }
        }
    });
});