define([
    "dojo/_base/declare",
    "../constants",
    "../plotUtils",
    "./Geometry"
], function (declare, constants, plotUtils, Geometry) {
    return declare([Geometry], {
        constructor: function (points) {
            this.type = "polygon";
            this.t = 0.4;
            this.fixPointCount = 3;
            this.setPoints(points);
        },
        generate: function () {
            var pnts = this.getPoints();
            if (pnts.length < 2) {
                return;
            }
            if (this.getPointCount() == 2) {
                var mid = plotUtils.mid(pnts[0], pnts[1]);
                var d = plotUtils.distance(pnts[0], mid) / 0.9;
                var pnt = plotUtils.getThirdPoint(pnts[0], mid, constants.HALF_PI, d, true);
                pnts = [pnts[0], pnt, pnts[1]];
            }
            var mid = plotUtils.mid(pnts[0], pnts[2]);
            pnts.push(mid, pnts[0], pnts[1]);

            var normals = [];
            for (var i = 0; i < pnts.length - 2; i++) {
                var pnt1 = pnts[i];
                var pnt2 = pnts[i + 1];
                var pnt3 = pnts[i + 2];
                var normalPoints = plotUtils.getBisectorNormals(this.t, pnt1, pnt2, pnt3);
                normals = normals.concat(normalPoints);
            }
            var count = normals.length;
            normals = [normals[count - 1]].concat(normals.slice(0, count - 1));
            var pList = [];
            for (i = 0; i < pnts.length - 2; i++) {
                pnt1 = pnts[i];
                pnt2 = pnts[i + 1];
                pList.push(pnt1);
                for (var t = 0; t <= constants.FITTING_COUNT; t++) {
                    var pnt = plotUtils.getCubicValue(t / constants.FITTING_COUNT, pnt1, normals[i * 2], normals[i * 2 + 1], pnt2);
                    pList.push(pnt);
                }
                pList.push(pnt2);
            }
            this.paths = pList;
        }
    });
});
