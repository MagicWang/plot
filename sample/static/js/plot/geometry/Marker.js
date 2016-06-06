//>>built
define("plot/geometry/Marker",["dojo/_base/declare","../plotUtils","./PlotGeometry"],function(b,d,c){return b([c],{constructor:function(a,b){this.type="point";this.plotType="marker";this.fixPointCount=1;this.setPoints(a)},generate:function(){var a=this.points[0];this.x=a[0];this.y=a[1]}})});
//# sourceMappingURL=Marker.js.map