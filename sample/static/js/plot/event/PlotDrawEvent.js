define([
    "dojo/_base/declare",
    "esri/graphic"
], function (declare, Graphic) {
    return declare(null, {
        constructor: function (type, feature) {
            this.feature = feature;
        }
    });
});
