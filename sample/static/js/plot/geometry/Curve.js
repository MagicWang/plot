//>>built
define("plot/geometry/Curve",["dojo/_base/declare","../plotUtils","./PlotGeometry"],function(b,c,d){return b([d],{constructor:function(a,b){this.type="polyline";this.plotType="curve";this.t=0.3;this.setPoints(a)},generate:function(){var a=this.getPointCount();2>a||(this.paths=2==a?this.points:c.getCurvePoints(this.t,this.points))}})});
//# sourceMappingURL=Curve.js.map