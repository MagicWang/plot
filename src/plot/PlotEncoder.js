define([], function () {
    var encoder = {};
    encoder.toJson = function (graphic) {
        if (graphic && graphic.plot && graphic.symbol) {
            return {
                plot: graphic.plot.toJson(),
                symbol: graphic.symbol.toJson()
            };
        }
    }
    return encoder;
});