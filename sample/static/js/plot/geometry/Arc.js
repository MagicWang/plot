//>>built
define("plot/geometry/Arc",["dojo/_base/declare","../plotUtils","./PlotGeometry"],function(d,c,k){return d([k],{constructor:function(a,b){this.type="polyline";this.plotType="arc";this.fixPointCount=3;this.setPoints(a)},generate:function(){var a=this.getPointCount();if(!(2>a))if(2==a)this.paths=this.points;else{var b=this.points[0],e=this.points[1],g=this.points[2],a=c.getCircleCenterOfThreePoints(b,e,g),d=c.distance(b,a),f=c.getAzimuth(b,a),h=c.getAzimuth(e,a);c.isClockWise(b,e,g)?b=h:(b=f,f=h);this.paths=
c.getArcPoints(a,d,b,f)}}})});
//# sourceMappingURL=Arc.js.map