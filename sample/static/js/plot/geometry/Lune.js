define([
    "dojo/_base/declare",
    "../constants",
    "../plotUtils",
    "./Geometry"
], function (declare, constants, plotUtils, Geometry) {
    return declare([Geometry], {
        constructor: function (points) {
            this.type = "polygon";
            this.fixPointCount = 3;
            this.setPoints(points);
        },
        generate: function () {
            if (this.getPointCount() < 2) {
                return;
            }
            var pnts = this.getPoints();
            if (this.getPointCount() == 2) {
                var mid = plotUtils.mid(pnts[0], pnts[1]);
                var d = plotUtils.distance(pnts[0], mid);
                var pnt = plotUtils.getThirdPoint(pnts[0], mid, constants.HALF_PI, d);
                pnts.push(pnt);
            }
            var pnt1 = pnts[0];
            var pnt2 = pnts[1];
            var pnt3 = pnts[2];
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
            var pnts = plotUtils.getArcPoints(center, radius, startAngle, endAngle);
            pnts.push(pnts[0]);
            this.paths = pnts;
        }
    });
});
