//>>built
define("plot/geometry/Polygon",["dojo/_base/declare","../plotUtils","./PlotGeometry"],function(a,c,b){return a([b],{constructor:function(a,b){this.plotType=this.type="polygon";this.setPoints(a)},generate:function(){2>this.getPointCount()||(this.rings=this.points.concat([this.points[0]]))}})});
//# sourceMappingURL=Polygon.js.map