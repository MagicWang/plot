define([
    "dojo/_base/declare",
    "../plotTypes",
    "../plotUtils",
    "./Geometry",
    "esri/geometry/Point"
], function (declare, plotTypes, plotUtils, Geometry, Point) {
    return declare([Point, Geometry], {
        constructor: function (points) {
            this.type = plotTypes.MARKER;
            this.fixPointCount = 1;
            this.setPoints(points);
        },
        generate: function () {
            var pnt = this.points[0];
            this.setCoordinates(pnt);
        }
    });
});


