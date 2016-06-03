//>>built
define("plot/geometry/PlotGeometry",["dojo/_base/declare"],function(c){return c(null,{constructor:function(a){this.plotType=this.type=null;this.setPoints(a)},setPoints:function(a){this.points=a?a:[];1<=this.points.length&&this.generate()},getPoints:function(){return this.points.slice(0)},getPointCount:function(){return this.points.length},updatePoint:function(a,b){0<=b&&b<this.points.length&&(this.points[b]=a,this.generate())},generate:function(){},toJson:function(){return{plotType:this.plotType,
points:this.points}}})});
//# sourceMappingURL=PlotGeometry.js.map