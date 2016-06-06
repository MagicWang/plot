//>>built
define("plot/geometry/Circle",["dojo/_base/declare","../constants","../plotUtils","./PlotGeometry"],function(h,e,k,l){return h([l],{constructor:function(a,b){this.type="polygon";this.plotType="circle";this.fixPointCount=2;this.setPoints(a)},generate:function(){if(!(2>this.getPointCount())){var a=this.points[0],b=k.distance(a,this.points[1]);this.rings=this.generatePoints(a,b)}},generatePoints:function(a,b){for(var f,c,g=[],d=0;d<=e.FITTING_COUNT;d++)c=2*Math.PI*d/e.FITTING_COUNT,f=a[0]+b*Math.cos(c),
c=a[1]+b*Math.sin(c),g.push([f,c]);return g}})});
//# sourceMappingURL=Circle.js.map