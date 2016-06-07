//>>built
define("plot/geometry/AttackArrow",["dojo/_base/declare","../constants","../plotUtils","./PlotGeometry"],function(n,l,d,p){return n([p],{constructor:function(a,b){this.type="polygon";this.plotType="attackarrow";this.headHeightFactor=0.18;this.headWidthFactor=0.3;this.neckHeightFactor=0.85;this.neckWidthFactor=0.15;this.headTailFactor=0.8;this.setPoints(a)},generate:function(){if(!(2>this.getPointCount()))if(2==this.getPointCount())this.rings=this.points;else{var a=this.getPoints(),b=a[0],c=a[1];d.isClockWise(a[0],
a[1],a[2])&&(b=a[1],c=a[0]);var e=[d.mid(b,c)].concat(a.slice(2)),a=this.getArrowHeadPoints(e,b,c),f=a[0],g=a[4],k=d.distance(b,c)/d.getBaseLength(e),e=this.getArrowBodyPoints(e,f,g,k),k=e.length,b=[b].concat(e.slice(0,k/2));b.push(f);c=[c].concat(e.slice(k/2,k));c.push(g);b=d.getQBSplinePoints(b);c=d.getQBSplinePoints(c);c=b.concat(a,c.reverse());this.rings=c.concat([c[0]])}},getArrowHeadPoints:function(a,b,c){var e=d.getBaseLength(a),f=e*this.headHeightFactor,g=a[a.length-1],e=d.distance(g,a[a.length-
2]);b=d.distance(b,c);f>b*this.headTailFactor&&(f=b*this.headTailFactor);c=f*this.headWidthFactor;b=f*this.neckWidthFactor;f=f>e?e:f;e=f*this.neckHeightFactor;f=d.getThirdPoint(a[a.length-2],g,0,f,!0);e=d.getThirdPoint(a[a.length-2],g,0,e,!0);a=d.getThirdPoint(g,f,l.HALF_PI,c,!1);f=d.getThirdPoint(g,f,l.HALF_PI,c,!0);c=d.getThirdPoint(g,e,l.HALF_PI,b,!1);b=d.getThirdPoint(g,e,l.HALF_PI,b,!0);return[c,a,g,f,b]},getArrowBodyPoints:function(a,b,c,e){var f=d.wholeDistance(a);e*=d.getBaseLength(a);b=d.distance(b,
c);b=(e-b)/2;c=0;for(var g=[],k=[],h=1;h<a.length-1;h++){var m=d.getAngleOfThreePoints(a[h-1],a[h],a[h+1])/2;c+=d.distance(a[h-1],a[h]);var l=(e/2-c/f*b)/Math.sin(m),n=d.getThirdPoint(a[h-1],a[h],Math.PI-m,l,!0),m=d.getThirdPoint(a[h-1],a[h],m,l,!1);g.push(n);k.push(m)}return g.concat(k)}})});
//# sourceMappingURL=AttackArrow.js.map