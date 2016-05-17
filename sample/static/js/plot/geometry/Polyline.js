define([
    "dojo/_base/declare",
    "../plotTypes",
    "../plotUtils",
    "./Geometry",
    "esri/geometry/Polyline"
], function (declare, plotTypes, plotUtils, Geometry, Polyline) {
    return declare([Polyline, Geometry], {
        constructor: function (points) {
            this.type = plotTypes.POLYLINE;
            this.setPoints(points);
        },
        generate: function () {
            var count = this.getPointCount();
            if (count < 2) {
                return;
            }
            this.setCoordinates(this.points);
        }
    });
});
