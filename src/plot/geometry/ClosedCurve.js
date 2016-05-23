define([
    "dojo/_base/declare",
    "../constants",
    "../plotUtils",
    "./PlotGeometry"
], function (declare, constants, plotUtils, PlotGeometry) {
    return declare([PlotGeometry], {
        constructor: function (points) {
            this.type = "polygon";
            this.t = 0.3;
            this.setPoints(points);
        },
        generate: function () {
            var count = this.getPointCount();
            if (count < 2) {
                return;
            }
            if (count == 2) {
                this.rings = this.points;
            }
            else {
                var pnts = this.getPoints();
                pnts.push(pnts[0], pnts[1]);
                var normals = [];
                for (var i = 0; i < pnts.length - 2; i++) {
                    var normalPoints = plotUtils.getBisectorNormals(this.t, pnts[i], pnts[i + 1], pnts[i + 2]);
                    normals = normals.concat(normalPoints);
                }
                var count = normals.length;
                normals = [normals[count - 1]].concat(normals.slice(0, count - 1));

                var pList = [];
                for (i = 0; i < pnts.length - 2; i++) {
                    var pnt1 = pnts[i];
                    var pnt2 = pnts[i + 1];
                    pList.push(pnt1);
                    for (var t = 0; t <= constants.FITTING_COUNT; t++) {
                        var pnt = plotUtils.getCubicValue(t / constants.FITTING_COUNT, pnt1, normals[i * 2], normals[i * 2 + 1], pnt2);
                        pList.push(pnt);
                    }
                    pList.push(pnt2);
                }
                this.rings = pList;
            }
        }
    });
});
