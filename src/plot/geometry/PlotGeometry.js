define([
    "dojo/_base/declare",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
    "esri/SpatialReference"
], function (declare, Point, Polyline, Polygon, SpatialReference) {
    return declare(null, {
        constructor: function (points, wkid) {
            this.wkid = wkid || 4326;
        },
        setPoints: function (value) {
            this.points = value ? value : [];
            if (this.points.length >= 1) {
                this.generate();
            }
        },
        getPoints: function () {
            return this.points.slice(0);
        },
        getPointCount: function () {
            return this.points.length;
        },
        updatePoint: function (point, index) {
            if (index >= 0 && index < this.points.length) {
                this.points[index] = point;
                this.generate();
            }
        },
        generate: function () {
        },
        toGeometry: function () {
            var geometry;
            if (this.type === "point") {
                geometry = new Point(this.x, this.y);
            }
            else if (this.type === "polyline") {
                geometry = new Polyline(this.paths);
            }
            else if (this.type === "polygon") {
                geometry = new Polygon(this.rings);
            }
            geometry.spatialReference = new SpatialReference(this.wkid);
            return geometry;
        },
        toJson: function () {
            return { "plotType": this.plotType, "points": this.points, "wkid": this.wkid };
        }
    });
});

