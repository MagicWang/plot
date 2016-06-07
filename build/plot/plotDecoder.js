//>>built
define("plot/plotDecoder",["./PlotDraw","esri/graphic","esri/symbols/jsonUtils"],function(c,d,e){return{fromJson:function(a){if(a&&a.plot&&a.symbol){var b=c.createPlot(a.plot.plotType,a.plot.points,a.plot.wkid);a=e.fromJson(a.symbol);if(b&&a)return a=new d(b.toGeometry(),a),a.plot=b,a}}}});
//# sourceMappingURL=plotDecoder.js.map