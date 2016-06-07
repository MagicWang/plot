//>>built
define("plot/geometry/FreehandPolygon",["dojo/_base/declare","../plotUtils","./PlotGeometry"],function(a,c,b){return a([b],{constructor:function(a,b){this.type="polygon";this.plotType="freehandpolygon";this.freehand=!0;this.setPoints(a)},generate:function(){2>this.getPointCount()||(this.rings=this.points.concat([this.points[0]]))}})});
//# sourceMappingURL=FreehandPolygon.js.map