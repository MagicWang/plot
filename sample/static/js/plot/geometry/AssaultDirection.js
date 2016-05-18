define([
    "dojo/_base/declare",
    "../plotTypes",
    "./FineArrow"
], function (declare, plotTypes, FineArrow) {
    return declare([FineArrow], {
        constructor: function (points) {
            this.type = plotTypes.ASSAULT_DIRECTION;
            this.geometryType = "polygon";
            this.tailWidthFactor = 0.2;
            this.neckWidthFactor = 0.25;
            this.headWidthFactor = 0.3;
            this.headAngle = Math.PI / 4;
            this.neckAngle = Math.PI * 0.17741;
            this.setPoints(points);
        }
    });
});