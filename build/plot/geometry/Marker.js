define([
    "dojo/_base/declare",
    "../plotUtils",
    "./Geometry"
], function (declare, plotUtils, Geometry) {
    return declare([Geometry], {
        constructor: function (points) {
            this.geometryType = "point";
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


