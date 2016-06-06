//>>built
define("plot/geometry/FreehandLine",["dojo/_base/declare","../plotUtils","./PlotGeometry"],function(a,c,b){return a([b],{constructor:function(a,b){this.type="polyline";this.plotType="freehandline";this.freehand=!0;this.setPoints(a)},generate:function(){2>this.getPointCount()||(this.paths=this.points)}})});
//# sourceMappingURL=FreehandLine.js.map