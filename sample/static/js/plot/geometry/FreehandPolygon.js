define([
    "dojo/_base/declare",
    "../plotTypes",
    "../plotUtils",
    "./Geometry",
    "esri/geometry/Polygon"
], function (declare, plotTypes, plotUtils, Geometry, Polygon) {
    return declare([Polygon, Geometry], {
        constructor: function (points) {
            this.type = plotTypes.FREEHAND_POLYGON;
            this.freehand = true;
            this.setPoints(points);
        },
        generate: function () {
            var count = this.getPointCount();
            if (count < 2) {
                return;
            }
            this.setCoordinates([this.points]);
        }
    });
});
