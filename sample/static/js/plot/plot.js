//>>built
require({cache:{"plot/geometry/Polyline":function(){define(["dojo/_base/declare","../plotUtils","./Geometry"],function(k,e,b){return k([b],{constructor:function(b){this.type="polyline";this.setPoints(b)},generate:function(){2>this.getPointCount()||(this.paths=this.points)}})})},"plot/geometry/Arc":function(){define(["dojo/_base/declare","../plotUtils","./Geometry"],function(k,e,b){return k([b],{constructor:function(b){this.type="polyline";this.fixPointCount=3;this.setPoints(b)},generate:function(){var b=
this.getPointCount();if(!(2>b))if(2==b)this.paths=this.points;else{var a=this.points[0],d=this.points[1],g=this.points[2],b=e.getCircleCenterOfThreePoints(a,d,g),f=e.distance(a,b),h=e.getAzimuth(a,b),l=e.getAzimuth(d,b);e.isClockWise(a,d,g)?a=l:(a=h,h=l);this.paths=e.getArcPoints(b,f,a,h)}}})})},"plot/geometry/Curve":function(){define(["dojo/_base/declare","../plotUtils","./Geometry"],function(k,e,b){return k([b],{constructor:function(b){this.type="polyline";this.t=0.3;this.setPoints(b)},generate:function(){var b=
this.getPointCount();2>b||(this.paths=2==b?this.points:e.getCurvePoints(this.t,this.points))}})})},"plot/geometry/ClosedCurve":function(){define(["dojo/_base/declare","../constants","../plotUtils","./Geometry"],function(k,e,b,c){return k([c],{constructor:function(a){this.type="polygon";this.t=0.3;this.setPoints(a)},generate:function(){var a=this.getPointCount();if(!(2>a))if(2==a)this.rings=this.points;else{var d=this.getPoints();d.push(d[0],d[1]);for(var c=[],a=0;a<d.length-2;a++)var f=b.getBisectorNormals(this.t,
d[a],d[a+1],d[a+2]),c=c.concat(f);a=c.length;c=[c[a-1]].concat(c.slice(0,a-1));f=[];for(a=0;a<d.length-2;a++){var h=d[a],l=d[a+1];f.push(h);for(var m=0;m<=e.FITTING_COUNT;m++){var k=b.getCubicValue(m/e.FITTING_COUNT,h,c[2*a],c[2*a+1],l);f.push(k)}f.push(l)}this.rings=f}}})})},"plot/geometry/FreehandPolygon":function(){define(["dojo/_base/declare","../plotUtils","./Geometry"],function(k,e,b){return k([b],{constructor:function(b){this.type="polygon";this.freehand=!0;this.setPoints(b)},generate:function(){2>
this.getPointCount()||(this.rings=this.points.concat([this.points[0]]))}})})},"plot/geometry/Circle":function(){define(["dojo/_base/declare","../constants","../plotUtils","./Geometry"],function(k,e,b,c){return k([c],{constructor:function(a){this.type="polygon";this.fixPointCount=2;this.setPoints(a)},generate:function(){if(!(2>this.getPointCount())){var a=this.points[0],d=b.distance(a,this.points[1]);this.rings=this.generatePoints(a,d)}},generatePoints:function(a,b){for(var c,f,h=[],l=0;l<=e.FITTING_COUNT;l++)f=
2*Math.PI*l/e.FITTING_COUNT,c=a[0]+b*Math.cos(f),f=a[1]+b*Math.sin(f),h.push([c,f]);return h}})})},"plot/geometry/Sector":function(){define(["dojo/_base/declare","../plotUtils","./Geometry"],function(k,e,b){return k([b],{constructor:function(b){this.type="polygon";this.fixPointCount=3;this.setPoints(b)},generate:function(){if(!(2>this.getPointCount()))if(2==this.getPointCount())this.rings=this.points;else{var b=this.getPoints(),a=b[0],d=b[1],g=b[2],b=e.distance(d,a),d=e.getAzimuth(d,a),g=e.getAzimuth(g,
a),b=e.getArcPoints(a,b,d,g);b.push(a,b[0]);this.rings=b}}})})},"plot/geometry/StraightArrow":function(){define(["dojo/_base/declare","../plotUtils","./Geometry"],function(k,e,b){return k([b],{constructor:function(b){this.type="polygon";this.fixPointCount=2;this.maxArrowLength=3E6;this.arrowLengthScale=5;this.setPoints(b)},generate:function(){if(!(2>this.getPointCount())){var b=this.getPoints(),a=b[0],b=b[1],d=e.distance(a,b)/this.arrowLengthScale,d=d>this.maxArrowLength?this.maxArrowLength:d,g=e.getThirdPoint(a,
b,Math.PI/6,d,!1),d=e.getThirdPoint(a,b,Math.PI/6,d,!0);this.rings=[a,b,g,b,d]}}})})},"plot/geometry/Geometry":function(){define(["dojo/_base/declare"],function(k){return k(null,{constructor:function(e){this.type=null;this.setPoints(e)},setPoints:function(e){this.points=e?e:[];1<=this.points.length&&this.generate()},getPoints:function(){return this.points.slice(0)},getPointCount:function(){return this.points.length},updatePoint:function(e,b){0<=b&&b<this.points.length&&(this.points[b]=e,this.generate())},
generate:function(){}})})},"plot/geometry/TailedAttackArrow":function(){define(["dojo/_base/declare","../plotUtils","./AttackArrow"],function(k,e,b){return k([b],{constructor:function(b){this.type="polygon";this.headHeightFactor=0.18;this.headWidthFactor=0.3;this.neckHeightFactor=0.85;this.neckWidthFactor=0.15;this.tailWidthFactor=0.1;this.headTailFactor=0.8;this.swallowTailFactor=1;this.swallowTailPnt=null;this.setPoints(b)},generate:function(){var b=this.getPointCount();if(!(2>b))if(2==this.getPointCount())this.rings=
this.points;else{var a=this.getPoints(),d=a[0],g=a[1];e.isClockWise(a[0],a[1],a[2])&&(d=a[1],g=a[0]);var b=[e.mid(d,g)].concat(a.slice(2)),a=this.getArrowHeadPoints(b,d,g),f=a[0],h=a[4],l=e.distance(d,g),m=e.getBaseLength(b);this.swallowTailPnt=e.getThirdPoint(b[1],b[0],0,m*this.tailWidthFactor*this.swallowTailFactor,!0);l=this.getArrowBodyPoints(b,f,h,l/m);b=l.length;d=[d].concat(l.slice(0,b/2));d.push(f);g=[g].concat(l.slice(b/2,b));g.push(h);d=e.getQBSplinePoints(d);g=e.getQBSplinePoints(g);this.rings=
d.concat(a,g.reverse(),[this.swallowTailPnt,d[0]])}}})})},"plot/geometry/GatheringPlace":function(){define(["dojo/_base/declare","../constants","../plotUtils","./Geometry"],function(k,e,b,c){return k([c],{constructor:function(a){this.type="polygon";this.t=0.4;this.fixPointCount=3;this.setPoints(a)},generate:function(){var a=this.getPoints();if(!(2>a.length)){if(2==this.getPointCount())var d=b.mid(a[0],a[1]),g=b.distance(a[0],d)/0.9,c=b.getThirdPoint(a[0],d,e.HALF_PI,g,!0),a=[a[0],c,a[1]];d=b.mid(a[0],
a[2]);a.push(d,a[0],a[1]);d=[];for(g=0;g<a.length-2;g++)var h=a[g],l=a[g+1],c=b.getBisectorNormals(this.t,h,l,a[g+2]),d=d.concat(c);for(var g=d.length,d=[d[g-1]].concat(d.slice(0,g-1)),m=[],g=0;g<a.length-2;g++){h=a[g];l=a[g+1];m.push(h);for(var k=0;k<=e.FITTING_COUNT;k++)c=b.getCubicValue(k/e.FITTING_COUNT,h,d[2*g],d[2*g+1],l),m.push(c);m.push(l)}this.rings=m}}})})},"plot/geometry/Lune":function(){define(["dojo/_base/declare","../constants","../plotUtils","./Geometry"],function(k,e,b,c){return k([c],
{constructor:function(a){this.type="polygon";this.fixPointCount=3;this.setPoints(a)},generate:function(){if(!(2>this.getPointCount())){var a=this.getPoints();if(2==this.getPointCount()){var d=b.mid(a[0],a[1]),g=b.distance(a[0],d),d=b.getThirdPoint(a[0],d,e.HALF_PI,g);a.push(d)}var g=a[0],c=a[1],h=a[2],a=b.getCircleCenterOfThreePoints(g,c,h),d=b.distance(g,a),l=b.getAzimuth(g,a),m=b.getAzimuth(c,a);b.isClockWise(g,c,h)?(g=m,c=l):(g=l,c=m);a=b.getArcPoints(a,d,g,c);a.push(a[0]);this.rings=a}}})})},
"plot/geometry/DoubleArrow":function(){define(["dojo/_base/declare","../constants","../plotUtils","./Geometry"],function(k,e,b,c){return k([c],{constructor:function(a){this.type="polygon";this.headHeightFactor=0.25;this.headWidthFactor=0.3;this.neckHeightFactor=0.85;this.neckWidthFactor=0.15;this.tempPoint4=this.connPoint=null;this.fixPointCount=4;this.setPoints(a)},generate:function(){var a=this.getPointCount();if(!(2>a))if(2==a)this.rings=this.points;else{var d=this.points[0],g=this.points[1],c=
this.points[2],a=this.getPointCount();this.tempPoint4=3==a?this.getTempPoint4(d,g,c):this.points[3];this.connPoint=3==a||4==a?b.mid(d,g):this.points[4];var h;b.isClockWise(d,g,c)?(a=this.getArrowPoints(d,this.connPoint,this.tempPoint4,!1),h=this.getArrowPoints(this.connPoint,g,c,!0)):(a=this.getArrowPoints(g,this.connPoint,c,!1),h=this.getArrowPoints(this.connPoint,d,this.tempPoint4,!0));var e=a.length,m=(e-5)/2,g=a.slice(0,m),d=a.slice(m,m+5),a=a.slice(m+5,e),c=h.slice(0,m),k=h.slice(m,m+5);h=h.slice(m+
5,e);c=b.getBezierPoints(c);g=b.getBezierPoints(h.concat(g.slice(1)));a=b.getBezierPoints(a);d=c.concat(k,g,d,a);this.rings=d.concat([d[0]])}},finishDrawing:function(){3==this.getPointCount()&&null!=this.tempPoint4&&this.points.push(this.tempPoint4);null!=this.connPoint&&this.points.push(this.connPoint)},getArrowPoints:function(a,d,c,f){var h=b.mid(a,d),l=b.distance(h,c),m=b.getThirdPoint(c,h,0,0.3*l,!0),k=b.getThirdPoint(c,h,0,0.5*l,!0),m=b.getThirdPoint(h,m,e.HALF_PI,l/5,f),k=b.getThirdPoint(h,
k,e.HALF_PI,l/4,f),l=[h,m,k,c];c=this.getArrowHeadPoints(l,this.headHeightFactor,this.headWidthFactor,this.neckHeightFactor,this.neckWidthFactor);f=c[0];h=c[4];m=b.distance(a,d)/b.getBaseLength(l)/2;m=this.getArrowBodyPoints(l,f,h,m);k=m.length;l=m.slice(0,k/2);m=m.slice(k/2,k);l.push(f);m.push(h);l=l.reverse();l.push(d);m=m.reverse();m.push(a);return l.reverse().concat(c,m)},getArrowHeadPoints:function(a,d,c){var f=b.getBaseLength(a)*this.headHeightFactor,h=a[a.length-1];b.distance(d,c);c=f*this.headWidthFactor;
d=f*this.neckWidthFactor;var l=f*this.neckHeightFactor,f=b.getThirdPoint(a[a.length-2],h,0,f,!0),l=b.getThirdPoint(a[a.length-2],h,0,l,!0);a=b.getThirdPoint(h,f,e.HALF_PI,c,!1);c=b.getThirdPoint(h,f,e.HALF_PI,c,!0);f=b.getThirdPoint(h,l,e.HALF_PI,d,!1);d=b.getThirdPoint(h,l,e.HALF_PI,d,!0);return[f,a,h,c,d]},getArrowBodyPoints:function(a,d,c,f){var h=b.wholeDistance(a);f*=b.getBaseLength(a);d=b.distance(d,c);d=(f-d)/2;c=0;for(var e=[],m=[],k=1;k<a.length-1;k++){var q=b.getAngleOfThreePoints(a[k-1],
a[k],a[k+1])/2;c+=b.distance(a[k-1],a[k]);var r=(f/2-c/h*d)/Math.sin(q),s=b.getThirdPoint(a[k-1],a[k],Math.PI-q,r,!0),q=b.getThirdPoint(a[k-1],a[k],q,r,!1);e.push(s);m.push(q)}return e.concat(m)},getTempPoint4:function(a,d,c){d=b.mid(a,d);var f=b.distance(d,c),h=b.getAngleOfThreePoints(a,d,c);h<e.HALF_PI?(c=f*Math.sin(h),f*=Math.cos(h),a=b.getThirdPoint(a,d,e.HALF_PI,c,!1),a=b.getThirdPoint(d,a,e.HALF_PI,f,!0)):h>=e.HALF_PI&&h<Math.PI?(c=f*Math.sin(Math.PI-h),f*=Math.cos(Math.PI-h),a=b.getThirdPoint(a,
d,e.HALF_PI,c,!1),a=b.getThirdPoint(d,a,e.HALF_PI,f,!1)):h>=Math.PI&&h<1.5*Math.PI?(c=f*Math.sin(h-Math.PI),f*=Math.cos(h-Math.PI),a=b.getThirdPoint(a,d,e.HALF_PI,c,!0),a=b.getThirdPoint(d,a,e.HALF_PI,f,!0)):(c=f*Math.sin(2*Math.PI-h),f*=Math.cos(2*Math.PI-h),a=b.getThirdPoint(a,d,e.HALF_PI,c,!0),a=b.getThirdPoint(d,a,e.HALF_PI,f,!1));return a}})})},"plot/constants":function(){define({TWO_PI:2*Math.PI,HALF_PI:Math.PI/2,FITTING_COUNT:100,ZERO_TOLERANCE:1E-4})},"plot/geometry/FineArrow":function(){define(["dojo/_base/declare",
"../constants","../plotUtils","./Geometry"],function(k,e,b,c){return k([c],{constructor:function(a){this.type="polygon";this.tailWidthFactor=0.15;this.neckWidthFactor=0.2;this.headWidthFactor=0.25;this.headAngle=Math.PI/8.5;this.neckAngle=Math.PI/13;this.fixPointCount=2;this.setPoints(a)},generate:function(){if(!(2>this.getPointCount())){var a=this.getPoints(),d=a[0],c=a[1],f=b.getBaseLength(a),h=f*this.tailWidthFactor,a=f*this.neckWidthFactor,l=f*this.headWidthFactor,f=b.getThirdPoint(c,d,e.HALF_PI,
h,!0),h=b.getThirdPoint(c,d,e.HALF_PI,h,!1),k=b.getThirdPoint(d,c,this.headAngle,l,!1),l=b.getThirdPoint(d,c,this.headAngle,l,!0),p=b.getThirdPoint(d,c,this.neckAngle,a,!1),d=b.getThirdPoint(d,c,this.neckAngle,a,!0),c=[f,p,k,c,l,d,h];this.rings=c.concat([c[0]])}}})})},"plot/plotUtils":function(){define(["./constants"],function(k){var e={distance:function(b,c){return Math.sqrt(Math.pow(b[0]-c[0],2)+Math.pow(b[1]-c[1],2))},wholeDistance:function(b){for(var c=0,a=0;a<b.length-1;a++)c+=e.distance(b[a],
b[a+1]);return c},getBaseLength:function(b){return Math.pow(e.wholeDistance(b),0.99)},mid:function(b,c){return[(b[0]+c[0])/2,(b[1]+c[1])/2]},getCircleCenterOfThreePoints:function(b,c,a){var d=[(b[0]+c[0])/2,(b[1]+c[1])/2],g=[(b[0]+a[0])/2,(b[1]+a[1])/2];return e.getIntersectPoint(d,[d[0]-b[1]+c[1],d[1]+b[0]-c[0]],g,[g[0]-b[1]+a[1],g[1]+b[0]-a[0]])},getIntersectPoint:function(b,c,a,d){if(b[1]==c[1])return d=(d[0]-a[0])/(d[1]-a[1]),c=d*(b[1]-a[1])+a[0],a=b[1],[c,a];if(a[1]==d[1])return c=(c[0]-b[0])/
(c[1]-b[1]),c=c*(a[1]-b[1])+b[0],a=a[1],[c,a];c=(c[0]-b[0])/(c[1]-b[1]);d=(d[0]-a[0])/(d[1]-a[1]);a=(c*b[1]-b[0]-d*a[1]+a[0])/(c-d);c=c*a-c*b[1]+b[0];return[c,a]},getAzimuth:function(b,c){var a,d=Math.asin(Math.abs(c[1]-b[1])/e.distance(b,c));c[1]>=b[1]&&c[0]>=b[0]?a=d+Math.PI:c[1]>=b[1]&&c[0]<b[0]?a=k.TWO_PI-d:c[1]<b[1]&&c[0]<b[0]?a=d:c[1]<b[1]&&c[0]>=b[0]&&(a=Math.PI-d);return a},getAngleOfThreePoints:function(b,c,a){b=e.getAzimuth(c,b)-e.getAzimuth(c,a);return 0>b?b+k.TWO_PI:b},isClockWise:function(b,
c,a){return(a[1]-b[1])*(c[0]-b[0])>(c[1]-b[1])*(a[0]-b[0])},getPointOnLine:function(b,c,a){return[c[0]+b*(a[0]-c[0]),c[1]+b*(a[1]-c[1])]},getCubicValue:function(b,c,a,d,g){b=Math.max(Math.min(b,1),0);var f=1-b,h=b*b,e=h*b,k=f*f,p=k*f;return[p*c[0]+3*k*b*a[0]+3*f*h*d[0]+e*g[0],p*c[1]+3*k*b*a[1]+3*f*h*d[1]+e*g[1]]},getThirdPoint:function(b,c,a,d,g){b=e.getAzimuth(b,c);g=g?b+a:b-a;a=d*Math.cos(g);d*=Math.sin(g);return[c[0]+a,c[1]+d]},getArcPoints:function(b,c,a,d){for(var g,f=[],h=d-a,h=0>h?h+k.TWO_PI:
h,e=0;e<=k.FITTING_COUNT;e++)g=a+h*e/k.FITTING_COUNT,d=b[0]+c*Math.cos(g),g=b[1]+c*Math.sin(g),f.push([d,g]);return f},getBisectorNormals:function(b,c,a,d){var g=e.getNormal(c,a,d),f=Math.sqrt(g[0]*g[0]+g[1]*g[1]),h=g[0]/f,g=g[1]/f,l=e.distance(c,a),m=e.distance(a,d);f>k.ZERO_TOLERANCE?e.isClockWise(c,a,d)?(d=b*l,f=a[0]-d*g,l=a[1]+d*h,c=[f,l],d=b*m,f=a[0]+d*g,l=a[1]-d*h):(d=b*l,f=a[0]+d*g,l=a[1]-d*h,c=[f,l],d=b*m,f=a[0]-d*g,l=a[1]+d*h):(f=a[0]+b*(c[0]-a[0]),l=a[1]+b*(c[1]-a[1]),c=[f,l],f=a[0]+b*(d[0]-
a[0]),l=a[1]+b*(d[1]-a[1]));b=[f,l];return[c,b]},getNormal:function(b,c,a){var d=b[0]-c[0];b=b[1]-c[1];var g=Math.sqrt(d*d+b*b),d=d/g;b/=g;g=a[0]-c[0];c=a[1]-c[1];a=Math.sqrt(g*g+c*c);return[d+g/a,b+c/a]},getCurvePoints:function(b,c){for(var a=[e.getLeftMostControlPoint(c)],d=0;d<c.length-2;d++)var g=c[d],f=c[d+1],g=e.getBisectorNormals(b,g,f,c[d+2]),a=a.concat(g);d=e.getRightMostControlPoint(c);a.push(d);for(var h=[],d=0;d<c.length-1;d++){g=c[d];f=c[d+1];h.push(g);for(b=0;b<k.FITTING_COUNT;b++){var l=
e.getCubicValue(b/k.FITTING_COUNT,g,a[2*d],a[2*d+1],f);h.push(l)}h.push(f)}return h},getLeftMostControlPoint:function(b){var c=b[0],a=b[1],d=b[2];b=e.getBisectorNormals(0,c,a,d)[0];d=e.getNormal(c,a,d);if(Math.sqrt(d[0]*d[0]+d[1]*d[1])>k.ZERO_TOLERANCE){var d=e.mid(c,a),g=c[0]-d[0],f=c[1]-d[1],a=2/e.distance(c,a),c=-a*f,a=a*g,g=2*c*a,f=b[0]-d[0],h=b[1]-d[1];b=d[0]+(c*c-a*a)*f+g*h;d=d[1]+g*f+(a*a-c*c)*h}else b=c[0]+t*(a[0]-c[0]),d=c[1]+t*(a[1]-c[1]);return[b,d]},getRightMostControlPoint:function(b){var c=
b.length,a=b[c-3],d=b[c-2],c=b[c-1];b=e.getBisectorNormals(0,a,d,c)[1];a=e.getNormal(a,d,c);if(Math.sqrt(a[0]*a[0]+a[1]*a[1])>k.ZERO_TOLERANCE){var a=e.mid(d,c),g=c[0]-a[0],f=c[1]-a[1],c=2/e.distance(d,c),d=-c*f,c=c*g,g=2*d*c,f=b[0]-a[0],h=b[1]-a[1];b=a[0]+(d*d-c*c)*f+g*h;a=a[1]+g*f+(c*c-d*d)*h}else b=c[0]+t*(d[0]-c[0]),a=c[1]+t*(d[1]-c[1]);return[b,a]},getBezierPoints:function(b){if(2>=b.length)return b;for(var c=[],a=b.length-1,d=0;1>=d;d+=0.01){for(var g=y=0,f=0;f<=a;f++){var h=e.getBinomialFactor(a,
f),l=Math.pow(d,f),k=Math.pow(1-d,a-f),g=g+h*l*k*b[f][0];y+=h*l*k*b[f][1]}c.push([g,y])}c.push(b[a]);return c},getBinomialFactor:function(b,c){return e.getFactorial(b)/(e.getFactorial(c)*e.getFactorial(b-c))},getFactorial:function(b){if(1>=b)return 1;if(2==b)return 2;if(3==b)return 6;if(4==b)return 24;if(5==b)return 120;for(var c=1,a=1;a<=b;a++)c*=a;return c},getQBSplinePoints:function(b){if(2>=b.length)return b;var c=[],a=b.length-2-1;c.push(b[0]);for(var d=0;d<=a;d++)for(var g=0;1>=g;g+=0.05){for(var f=
y=0,h=0;2>=h;h++){var l=e.getQuadricBSplineFactor(h,g),f=f+l*b[d+h][0];y+=l*b[d+h][1]}c.push([f,y])}c.push(b[b.length-1]);return c},getQuadricBSplineFactor:function(b,c){return 0==b?Math.pow(c-1,2)/2:1==b?(-2*Math.pow(c,2)+2*c+1)/2:2==b?Math.pow(c,2)/2:0}};return e})},"plot/geometry/Marker":function(){define(["dojo/_base/declare","../plotUtils","./Geometry"],function(k,e,b){return k([b],{constructor:function(b){this.type="point";this.fixPointCount=1;this.setPoints(b)},generate:function(){var b=this.points[0];
this.x=b[0];this.y=b[1]}})})},"plot/PlotEdit":function(){define("dojo/_base/declare dojo/_base/lang dojo/dom dojo/Evented ./constants ./plotUtils esri/geometry/Point esri/geometry/Polyline esri/geometry/Polygon esri/graphic esri/Color esri/symbols/SimpleMarkerSymbol esri/symbols/SimpleLineSymbol".split(" "),function(k,e,b,c,a,d,g,f,h,l,m,p,q){return k([c],{constructor:function(a){if(a){var b=new q(q.STYLE_SOLID,new m("#000000"),1);this.controlPointSymbol=new p(p.STYLE_SQUARE,12,b,new m("#003388"));
this._map=a;this._activeControlPointGraphic=this._controlPointGraphics=this._startPoint=this._graphic=null;this._layerMouseOverHandler=e.hitch(this,this._layerMouseOverHandler);this._layerMouseOutHandler=e.hitch(this,this._layerMouseOutHandler);this._layerMouseDownHandler=e.hitch(this,this._layerMouseDownHandler);this._layerMouseDragHandler=e.hitch(this,this._layerMouseDragHandler);this._layerMouseDragEndHandler=e.hitch(this,this._layerMouseDragEndHandler);this._controlPointLayerMouseDownHandler=
e.hitch(this,this._controlPointLayerMouseDownHandler);this._controlPointLayerMouseDragHandler=e.hitch(this,this._controlPointLayerMouseDragHandler);this._controlPointLayerMouseDragEndHandler=e.hitch(this,this._controlPointLayerMouseDragEndHandler)}},activate:function(a){a&&(a.plot&&a!=this._graphic)&&(this.deactivate(),this._graphic=a,this._initControlPoints(),this._layerMouseOver_Connect=this._graphic.getLayer().on("mouse-over",this._layerMouseOverHandler),this._layerMouseOut_Connect=this._graphic.getLayer().on("mouse-out",
this._layerMouseOutHandler))},deactivate:function(){this._graphic=null;this._clearControlPoints();this._startPoint=this._activeControlPointGraphic=null;this._layerMouseOver_Connect&&this._layerMouseOver_Connect.remove();this._layerMouseOut_Connect&&this._layerMouseOut_Connect.remove();this._layerMouseDown_Connect&&this._layerMouseDown_Connect.remove();this._layerMouseDrag_Connect&&this._layerMouseDrag_Connect.remove();this._layerMouseDragEnd_Connect&&this._layerMouseDragEnd_Connect.remove();this._controlPointLayerMouseDown_Connect&&
this._controlPointLayerMouseDown_Connect.remove();this._controlPointLayerMouseDrag_Connect&&this._controlPointLayerMouseDrag_Connect.remove();this._controlPointLayerMouseDragEnd_Connect&&this._controlPointLayerMouseDragEnd_Connect.remove()},_initControlPoints:function(){if(this._map){this._controlPointGraphics=[];var a=this._getControlPoints();if(a&&!(0>=a.length)){for(var b=0;b<a.length;b++){var d=new g(a[b][0],a[b][1]);d.spatialReference=this._map.spatialReference;d=new l(d,this.controlPointSymbol);
this._controlPointGraphics.push(d);this._map.graphics.add(d)}this._controlPointLayerMouseDown_Connect=this._map.graphics.on("mouse-down",this._controlPointLayerMouseDownHandler)}}},_clearControlPoints:function(){if(this._controlPointGraphics&&0<this._controlPointGraphics.length){for(var a=0;a<this._controlPointGraphics.length;a++)this._map.graphics.remove(this._controlPointGraphics[a]);this._controlPointGraphics=null}},_controlPointLayerMouseDownHandler:function(a){this._controlPointGraphics&&0<=
this._controlPointGraphics.indexOf(a.graphic)&&(this._activeControlPointGraphic=a.graphic,this._map.disablePan(),this._controlPointLayerMouseDrag_Connect=this._map.on("mouse-drag",this._controlPointLayerMouseDragHandler),this._controlPointLayerMouseDragEnd_Connect=this._map.on("mouse-drag-end",this._controlPointLayerMouseDragEndHandler))},_controlPointLayerMouseDragHandler:function(a){if(this._activeControlPointGraphic){this._activeControlPointGraphic.setGeometry(a.mapPoint);var b=this._controlPointGraphics.indexOf(this._activeControlPointGraphic);
this._graphic.plot.updatePoint([a.mapPoint.x,a.mapPoint.y],b);this._graphic.setGeometry(this._generateGeometry(this._graphic.plot))}},_controlPointLayerMouseDragEndHandler:function(a){this._activeControlPointGraphic=null;this._map.enablePan();this._controlPointLayerMouseDrag_Connect.remove();this._controlPointLayerMouseDragEnd_Connect.remove()},_layerMouseOverHandler:function(a){this._graphic&&this._graphic==a.graphic&&(this._map.setMapCursor("move"),this._layerMouseDown_Connect&&this._layerMouseDown_Connect.remove(),
this._layerMouseDown_Connect=this._graphic.getLayer().on("mouse-down",this._layerMouseDownHandler))},_layerMouseOutHandler:function(a){this._map.setMapCursor("default");this._layerMouseDown_Connect&&this._layerMouseDown_Connect.remove()},_layerMouseDownHandler:function(a){this._startPoint=a.mapPoint;this._map.disablePan();this._layerMouseDrag_Connect=this._map.on("mouse-drag",this._layerMouseDragHandler);this._layerMouseDragEnd_Connect=this._map.on("mouse-drag-end",this._layerMouseDragEndHandler)},
_layerMouseDragHandler:function(a){if(!this._activeControlPointGraphic){for(var b=a.mapPoint.x-this._startPoint.x,d=a.mapPoint.y-this._startPoint.y,c=[],f=0;f<this._controlPointGraphics.length;f++){var e=this._controlPointGraphics[f].geometry,e=[e.x+b,e.y+d];this._startPoint=a.mapPoint;var h=new g(e);h.spatialReference=this._map.spatialReference;this._controlPointGraphics[f].setGeometry(h);c.push(e)}this._graphic.plot.setPoints(c);this._graphic.setGeometry(this._generateGeometry(this._graphic.plot))}},
_layerMouseDragEndHandler:function(a){this._map.enablePan();this._layerMouseDown_Connect.remove();this._layerMouseDrag_Connect.remove();this._layerMouseDragEnd_Connect.remove()},_getControlPoints:function(){return!this._graphic?[]:this._graphic.plot.getPoints()},_generateGeometry:function(a){var b;"point"===a.type?b=new g(a.x,a.y):"polyline"===a.type?b=new f(a.paths):"polygon"===a.type&&(b=new h(a.rings));b.spatialReference=this._map.spatialReference;return b}})})},"plot/geometry/Ellipse":function(){define(["dojo/_base/declare",
"../constants","../plotUtils","./Geometry"],function(k,e,b,c){return k([c],{constructor:function(a){this.type="polygon";this.fixPointCount=2;this.setPoints(a)},generate:function(){if(!(2>this.getPointCount())){var a=this.points[0],d=this.points[1],c=b.mid(a,d),f=Math.abs((a[0]-d[0])/2),a=Math.abs((a[1]-d[1])/2);this.rings=this.generatePoints(c,f,a)}},generatePoints:function(a,b,c){for(var f,h,l=[],k=0;k<=e.FITTING_COUNT;k++)h=2*Math.PI*k/e.FITTING_COUNT,f=a[0]+b*Math.cos(h),h=a[1]+c*Math.sin(h),l.push([f,
h]);return l}})})},"plot/geometry/AttackArrow":function(){define(["dojo/_base/declare","../constants","../plotUtils","./Geometry"],function(k,e,b,c){return k([c],{constructor:function(a){this.type="polygon";this.headHeightFactor=0.18;this.headWidthFactor=0.3;this.neckHeightFactor=0.85;this.neckWidthFactor=0.15;this.headTailFactor=0.8;this.setPoints(a)},generate:function(){if(!(2>this.getPointCount()))if(2==this.getPointCount())this.rings=this.points;else{var a=this.getPoints(),d=a[0],c=a[1];b.isClockWise(a[0],
a[1],a[2])&&(d=a[1],c=a[0]);var f=[b.mid(d,c)].concat(a.slice(2)),a=this.getArrowHeadPoints(f,d,c),e=a[0],k=a[4],m=b.distance(d,c)/b.getBaseLength(f),f=this.getArrowBodyPoints(f,e,k,m),m=f.length,d=[d].concat(f.slice(0,m/2));d.push(e);c=[c].concat(f.slice(m/2,m));c.push(k);d=b.getQBSplinePoints(d);c=b.getQBSplinePoints(c);c=d.concat(a,c.reverse());this.rings=c.concat([c[0]])}},getArrowHeadPoints:function(a,d,c){var f=b.getBaseLength(a),h=f*this.headHeightFactor,k=a[a.length-1],f=b.distance(k,a[a.length-
2]);d=b.distance(d,c);h>d*this.headTailFactor&&(h=d*this.headTailFactor);c=h*this.headWidthFactor;d=h*this.neckWidthFactor;h=h>f?f:h;f=h*this.neckHeightFactor;h=b.getThirdPoint(a[a.length-2],k,0,h,!0);f=b.getThirdPoint(a[a.length-2],k,0,f,!0);a=b.getThirdPoint(k,h,e.HALF_PI,c,!1);h=b.getThirdPoint(k,h,e.HALF_PI,c,!0);c=b.getThirdPoint(k,f,e.HALF_PI,d,!1);d=b.getThirdPoint(k,f,e.HALF_PI,d,!0);return[c,a,k,h,d]},getArrowBodyPoints:function(a,c,g,f){var e=b.wholeDistance(a);f*=b.getBaseLength(a);c=b.distance(c,
g);c=(f-c)/2;g=0;for(var k=[],m=[],p=1;p<a.length-1;p++){var q=b.getAngleOfThreePoints(a[p-1],a[p],a[p+1])/2;g+=b.distance(a[p-1],a[p]);var r=(f/2-g/e*c)/Math.sin(q),s=b.getThirdPoint(a[p-1],a[p],Math.PI-q,r,!0),q=b.getThirdPoint(a[p-1],a[p],q,r,!1);k.push(s);m.push(q)}return k.concat(m)}})})},"plot/geometry/Polygon":function(){define(["dojo/_base/declare","../plotUtils","./Geometry"],function(k,e,b){return k([b],{constructor:function(b){this.type="polygon";this.setPoints(b)},generate:function(){2>
this.getPointCount()||(this.rings=this.points.concat([this.points[0]]))}})})},"plot/geometry/SquadCombat":function(){define(["dojo/_base/declare","../constants","../plotUtils","./AttackArrow"],function(k,e,b,c){return k([c],{constructor:function(a){this.type="polygon";this.headHeightFactor=0.18;this.headWidthFactor=0.3;this.neckHeightFactor=0.85;this.neckWidthFactor=0.15;this.tailWidthFactor=0.1;this.setPoints(a)},generate:function(){var a=this.getPointCount();if(!(2>a)){var c=this.getPoints(),g=
this.getTailPoints(c),f=this.getArrowHeadPoints(c,g[0],g[1]),e=f[0],k=f[4],m=this.getArrowBodyPoints(c,e,k,this.tailWidthFactor),a=m.length,c=[g[0]].concat(m.slice(0,a/2));c.push(e);g=[g[1]].concat(m.slice(a/2,a));g.push(k);c=b.getQBSplinePoints(c);g=b.getQBSplinePoints(g);f=c.concat(f,g.reverse());this.rings=f.concat([f[0]])}},getTailPoints:function(a){var c=b.getBaseLength(a)*this.tailWidthFactor,g=b.getThirdPoint(a[1],a[0],e.HALF_PI,c,!1);a=b.getThirdPoint(a[1],a[0],e.HALF_PI,c,!0);return[g,a]}})})},
"plot/geometry/FreehandLine":function(){define(["dojo/_base/declare","../plotUtils","./Geometry"],function(k,e,b){return k([b],{constructor:function(b){this.type="polyline";this.freehand=!0;this.setPoints(b)},generate:function(){2>this.getPointCount()||(this.paths=this.points)}})})},"plot/geometry/Rectangle":function(){define(["dojo/_base/declare","../plotUtils","./Geometry"],function(k,e,b){return k([b],{constructor:function(b){this.type="polygon";this.fixPointCount=2;this.setPoints(b)},generate:function(){if(!(2>
this.getPointCount())){var b=this.points[0],a=this.points[1],d=Math.min(b[0],a[0]),e=Math.max(b[0],a[0]),f=Math.min(b[1],a[1]),b=Math.max(b[1],a[1]),a=[d,b];this.rings=[a,[e,b],[e,f],[d,f],a]}}})})},"plot/geometry/AssaultDirection":function(){define(["dojo/_base/declare","./FineArrow"],function(k,e){return k([e],{constructor:function(b){this.type="polygon";this.tailWidthFactor=0.2;this.neckWidthFactor=0.25;this.headWidthFactor=0.3;this.headAngle=Math.PI/4;this.neckAngle=0.17741*Math.PI;this.setPoints(b)}})})},
"plot/PlotDraw":function(){define("dojo/_base/declare dojo/_base/lang dojo/Evented ./constants ./plotUtils esri/graphic esri/Color esri/symbols/SimpleMarkerSymbol esri/symbols/SimpleLineSymbol esri/symbols/SimpleFillSymbol esri/geometry/Point esri/geometry/Polyline esri/geometry/Polygon ./geometry/Arc ./geometry/AssaultDirection ./geometry/AttackArrow ./geometry/Circle ./geometry/ClosedCurve ./geometry/Curve ./geometry/DoubleArrow ./geometry/Ellipse ./geometry/FineArrow ./geometry/FreehandLine ./geometry/FreehandPolygon ./geometry/GatheringPlace ./geometry/Lune ./geometry/Marker ./geometry/Polygon ./geometry/Polyline ./geometry/Rectangle ./geometry/Sector ./geometry/SquadCombat ./geometry/StraightArrow ./geometry/TailedAttackArrow ./geometry/TailedSquadCombat".split(" "),
function(k,e,b,c,a,d,g,f,h,l,m,p,q,r,s,u,v,w,x,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O){var n=k([b],{constructor:function(a){this.markerSymbol=new f(f.STYLE_SQUARE,8,null,new g("#000000"));this.lineSymbol=new h(h.STYLE_SOLID,new g("#000000"),2);this.fillSymbol=new l(l.STYLE_SOLID,this.lineSymbol,new g([0,0,0,0.25]));this._firstClickHandler=e.hitch(this,this._firstClickHandler);this._nextClickHandler=e.hitch(this,this._nextClickHandler);this._doubleClickHandler=e.hitch(this,this._doubleClickHandler);this._mouseMoveHandler=
e.hitch(this,this._mouseMoveHandler);this._plotParams=this._plotType=this._graphic=this._plot=this._points=null;this._map=a},activate:function(a,b){this.deactivate();this._map.disableDoubleClickZoom();this._firstClick_Connect=this._map.on("click",this._firstClickHandler);this._plotType=a;this._plotParams=b},deactivate:function(){this._firstClick_Connect&&this._firstClick_Connect.remove();this._nextClick_Connect&&this._nextClick_Connect.remove();this._doubleClick_Connect&&this._doubleClick_Connect.remove();
this._mouseMove_Connect&&this._mouseMove_Connect.remove();this._map.enableDoubleClickZoom();this._map.graphics.remove(this._graphic);this._points=[];this._plotParams=this._plotType=this._graphic=this._plot=null},isDrawing:null!=this._plotType,_firstClickHandler:function(a){this._firstClick_Connect.remove();this._points.push([a.mapPoint.x,a.mapPoint.y]);this._plot=this._createPlot(this._plotType,this._points,this._plotParams);this._graphic=new d;this._graphic.setSymbol(this._generateSymbol(this._plot));
this._map.graphics.add(this._graphic);this._plot.fixPointCount==this._plot.getPointCount()?this._doubleClickHandler(a):(this._nextClick_Connect=this._map.on("click",this._nextClickHandler),this._plot.freehand||(this._doubleClick_Connect=this._map.on("dbl-click",this._doubleClickHandler)),this._mouseMove_Connect=this._map.on("mouse-move",this._mouseMoveHandler))},_nextClickHandler:function(b){if(this._plot.freehand||!(a.distance([b.mapPoint.x,b.mapPoint.y],this._points[this._points.length-1])<c.ZERO_TOLERANCE))this._points.push([b.mapPoint.x,
b.mapPoint.y]),this._plot.setPoints(this._points),this._plot.fixPointCount==this._plot.getPointCount()?this._doubleClickHandler(b):(this._plot&&this._plot.freehand&&this._doubleClickHandler(b),this._graphic.setGeometry(this._generateGeometry(this._plot)))},_doubleClickHandler:function(a){this.emit("draw-end",{geometry:this._generateGeometry(this._plot),plot:this._plot});this.deactivate()},_mouseMoveHandler:function(b){a.distance([b.mapPoint.x,b.mapPoint.y],this._points[this._points.length-1])<c.ZERO_TOLERANCE||
(this._plot.freehand?(this._points.push([b.mapPoint.x,b.mapPoint.y]),this._plot.setPoints(this._points)):(b=this._points.concat([[b.mapPoint.x,b.mapPoint.y]]),this._plot.setPoints(b)),this._graphic.setGeometry(this._generateGeometry(this._plot)))},_generateGeometry:function(a){var b;"point"===a.type?b=new m(a.x,a.y):"polyline"===a.type?b=new p(a.paths):"polygon"===a.type&&(b=new q(a.rings));b.spatialReference=this._map.spatialReference;return b},_generateSymbol:function(a){var b;"point"===a.type?
b=this.markerSymbol:"polyline"===a.type?b=this.lineSymbol:"polygon"===a.type&&(b=this.fillSymbol);return b},_createPlot:function(a,b){switch(a){case n.ARC:return new r(b);case n.ELLIPSE:return new A(b);case n.CURVE:return new x(b);case n.CLOSED_CURVE:return new w(b);case n.LUNE:return new F(b);case n.SECTOR:return new K(b);case n.GATHERING_PLACE:return new E(b);case n.STRAIGHT_ARROW:return new M(b);case n.ASSAULT_DIRECTION:return new s(b);case n.ATTACK_ARROW:return new u(b);case n.FINE_ARROW:return new B(b);
case n.CIRCLE:return new v(b);case n.DOUBLE_ARROW:return new z(b);case n.TAILED_ATTACK_ARROW:return new N(b);case n.SQUAD_COMBAT:return new L(b);case n.TAILED_SQUAD_COMBAT:return new O(b);case n.FREEHAND_LINE:return new C(b);case n.FREEHAND_POLYGON:return new D(b);case n.POLYGON:return new H(b);case n.MARKER:return new G(b);case n.RECTANGLE:return new J(b);case n.POLYLINE:return new I(b)}}});e.mixin(n,{ARC:"arc",ELLIPSE:"ellipse",CURVE:"curve",CLOSED_CURVE:"closedcurve",LUNE:"lune",SECTOR:"sector",
GATHERING_PLACE:"gatheringplace",STRAIGHT_ARROW:"straightarrow",ASSAULT_DIRECTION:"assaultdirection",ATTACK_ARROW:"attackarrow",TAILED_ATTACK_ARROW:"tailedattackarrow",SQUAD_COMBAT:"squadcombat",TAILED_SQUAD_COMBAT:"tailedsquadcombat",FINE_ARROW:"finearrow",CIRCLE:"circle",DOUBLE_ARROW:"doublearrow",POLYLINE:"polyline",FREEHAND_LINE:"freehandline",POLYGON:"polygon",FREEHAND_POLYGON:"freehandpolygon",RECTANGLE:"rectangle",MARKER:"marker",TRIANGLE:"triangle"});return n})},"plot/geometry/TailedSquadCombat":function(){define(["dojo/_base/declare",
"../constants","../plotUtils","./AttackArrow"],function(k,e,b,c){return k([c],{constructor:function(a){this.type="polygon";this.headHeightFactor=0.18;this.headWidthFactor=0.3;this.neckHeightFactor=0.85;this.neckWidthFactor=0.15;this.tailWidthFactor=0.1;this.swallowTailFactor=1;this.swallowTailPnt=null;this.setPoints(a)},generate:function(){var a=this.getPointCount();if(!(2>a)){var c=this.getPoints(),e=this.getTailPoints(c),f=this.getArrowHeadPoints(c,e[0],e[2]),h=f[0],k=f[4],m=this.getArrowBodyPoints(c,
h,k,this.tailWidthFactor),a=m.length,c=[e[0]].concat(m.slice(0,a/2));c.push(h);h=[e[2]].concat(m.slice(a/2,a));h.push(k);c=b.getQBSplinePoints(c);h=b.getQBSplinePoints(h);this.rings=c.concat(f,h.reverse(),[e[1],c[0]])}},getTailPoints:function(a){var c=b.getBaseLength(a)*this.tailWidthFactor,g=b.getThirdPoint(a[1],a[0],e.HALF_PI,c,!1),f=b.getThirdPoint(a[1],a[0],e.HALF_PI,c,!0);a=b.getThirdPoint(a[1],a[0],0,c*this.swallowTailFactor,!0);return[g,a,f]}})})}}});define("plot/plot",[],1);
//# sourceMappingURL=plot.js.map