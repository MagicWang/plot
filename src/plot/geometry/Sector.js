define([
    "dojo/_base/declare",
    "../plotUtils",
    "./PlotGeometry"
], function (declare, plotUtils, PlotGeometry) {
    return declare([PlotGeometry], {
        constructor: function (points) {
            this.type = "polygon";
            this.plotType = "sector";
            this.fixPointCount = 3;
            this.setPoints(points);
        },
        generate: function () {
            if (this.getPointCount() < 2)
                return;
            if (this.getPointCount() == 2)
                this.rings = this.points;
            else {
                var pnts = this.getPoints();
                var center = pnts[0];
                var pnt2 = pnts[1];
                var pnt3 = pnts[2];
                var radius = plotUtils.distance(pnt2, center);
                var startAngle = plotUtils.getAzimuth(pnt2, center);
                var endAngle = plotUtils.getAzimuth(pnt3, center);
                var pList = plotUtils.getArcPoints(center, radius, startAngle, endAngle);
                pList.push(center, pList[0]);
                this.rings = pList;
            }
        }
    });
});
