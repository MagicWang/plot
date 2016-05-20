define([
    "dojo/_base/declare",
    "../plotUtils",
    "./Geometry"
], function (declare, plotUtils, Geometry) {
    return declare([Geometry], {
        constructor: function (points) {
            this.type = "polygon";
            this.freehand = true;
            this.setPoints(points);
        },
        generate: function () {
            var count = this.getPointCount();
            if (count < 2) {
                return;
            }
            this.paths = this.points.concat([this.points[0]]);
        }
    });
});
