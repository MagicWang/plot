define([
    "dojo/_base/declare",
    "../plotTypes",
    "../plotUtils",
    "./Geometry",
    "esri/geometry/Polyline"
], function (declare, plotTypes, plotUtils, Geometry, Polyline) {
    return declare([Polyline, Geometry], {
        constructor: function (points) {
            this.type = plotTypes.STRAIGHT_ARROW;
            this.fixPointCount = 2;
            this.maxArrowLength = 3000000;
            this.arrowLengthScale = 5;
            this.setPoints(points);
        },
        generate: function () {
            if (this.getPointCount() < 2) {
                return;
            }
            var pnts = this.getPoints();
            var pnt1 = pnts[0];
            var pnt2 = pnts[1];
            var distance = plotUtils.distance(pnt1, pnt2);
            var len = distance / this.arrowLengthScale;
            len = len > this.maxArrowLength ? this.maxArrowLength : len;
            var leftPnt = plotUtils.getThirdPoint(pnt1, pnt2, Math.PI / 6, len, false);
            var rightPnt = plotUtils.getThirdPoint(pnt1, pnt2, Math.PI / 6, len, true);
            this.setCoordinates([pnt1, pnt2, leftPnt, pnt2, rightPnt]);
        }
    });
});
