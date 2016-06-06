define([
    "dojo/_base/declare",
    "../plotUtils",
    "./PlotGeometry"
], function (declare, plotUtils, PlotGeometry) {
    return declare([PlotGeometry], {
        constructor: function (points, wkid) {
            this.type = "polyline";
            this.plotType = "arc";
            this.fixPointCount = 3;
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
                var pnt1 = this.points[0];
                var pnt2 = this.points[1];
                var pnt3 = this.points[2];
                var center = plotUtils.getCircleCenterOfThreePoints(pnt1, pnt2, pnt3);
                var radius = plotUtils.distance(pnt1, center);

                var angle1 = plotUtils.getAzimuth(pnt1, center);
                var angle2 = plotUtils.getAzimuth(pnt2, center);
                if (plotUtils.isClockWise(pnt1, pnt2, pnt3)) {
                    var startAngle = angle2;
                    var endAngle = angle1;
                }
                else {
                    startAngle = angle1;
                    endAngle = angle2;
                }
                this.paths = plotUtils.getArcPoints(center, radius, startAngle, endAngle);
            }
        }
    });
});