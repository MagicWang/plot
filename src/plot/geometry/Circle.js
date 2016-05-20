define([
    "dojo/_base/declare",
    "../constants",
    "../plotUtils",
    "./Geometry"
], function (declare, constants, plotUtils, Geometry) {
    return declare([Geometry], {
        constructor: function (points) {
            this.type = "polygon";
            this.fixPointCount = 2;
            this.setPoints(points);
        },
        generate: function () {
            var count = this.getPointCount();
            if (count < 2) {
                return;
            }
            var center = this.points[0];
            var radius = plotUtils.distance(center, this.points[1]);
            this.paths = this.generatePoints(center, radius);
        },
        generatePoints: function (center, radius) {
            var x, y, angle, points = [];
            for (var i = 0; i <= constants.FITTING_COUNT; i++) {
                angle = Math.PI * 2 * i / constants.FITTING_COUNT;
                x = center[0] + radius * Math.cos(angle);
                y = center[1] + radius * Math.sin(angle);
                points.push([x, y]);
            }
            return points;
        }
    });
});

