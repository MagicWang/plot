//>>built
define("plot/geometry/Circle",["dojo/_base/declare","../constants","../plotUtils","./PlotGeometry"],function(h,e,k,l){return h([l],{constructor:function(a){this.type="polygon";this.plotType="circle";this.fixPointCount=2;this.setPoints(a)},generate:function(){if(!(2>this.getPointCount())){var a=this.points[0],c=k.distance(a,this.points[1]);this.rings=this.generatePoints(a,c)}},generatePoints:function(a,c){for(var f,b,g=[],d=0;d<=e.FITTING_COUNT;d++)b=2*Math.PI*d/e.FITTING_COUNT,f=a[0]+c*Math.cos(b),
b=a[1]+c*Math.sin(b),g.push([f,b]);return g}})});
//# sourceMappingURL=Circle.js.map