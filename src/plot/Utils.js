define(function () {
    var util = {};
    util.trim = function (str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
    };
    util.stamp = function (obj) {
        var key = '_p_id_';
        obj[key] = obj[key] || this._stampId++;
        return obj[key];
    };
    return util;
});
