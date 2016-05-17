define([
    "dojo/_base/declare",
    "../plotTypes",
    "../plotUtils",
    "./Geometry",
    "esri/geometry/Polygon"
], function (declare, plotTypes, plotUtils, Geometry, Polygon) {
    return declare([Polygon, Geometry], {
        constructor: function (points) {
            this.type = plotTypes.RECTANGLE;
            this.fixPointCount = 2;
            this.setPoints(points);
        },
        generate: function () {
           
        }
    });
});
