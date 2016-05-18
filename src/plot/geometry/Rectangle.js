define([
    "dojo/_base/declare",
    "../plotTypes",
    "../plotUtils",
    "./Geometry"
], function (declare, plotTypes, plotUtils, Geometry) {
    return declare([Geometry], {
        constructor: function (points) {
            this.type = plotTypes.RECTANGLE;
            this.geometryType = "polygon";
            this.fixPointCount = 2;
            this.setPoints(points);
        },
        generate: function () {
            var count = this.getPointCount();
            if (count < 2) {
                return;
            } else {
                var pnt1 = this.points[0];
                var pnt2 = this.points[1];
                var xmin = Math.min(pnt1[0], pnt2[0]);
                var xmax = Math.max(pnt1[0], pnt2[0]);
                var ymin = Math.min(pnt1[1], pnt2[1]);
                var ymax = Math.max(pnt1[1], pnt2[1]);
                var tl = [xmin, ymax];
                var tr = [xmax, ymax];
                var br = [xmax, ymin];
                var bl = [xmin, ymin];
                this.paths = [tl, tr, br, bl, tl];
            }
        }
    });
});
