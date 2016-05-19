define([
    "dojo/_base/declare",
    "../constants",
    "../plotUtils",
    "./Geometry"
], function (declare, constants, plotUtils, Geometry) {
    return declare([Geometry], {
        constructor: function (points) {
            this.geometryType = "polygon";
            this.headHeightFactor = 0.25;
            this.headWidthFactor = 0.3;
            this.neckHeightFactor = 0.85;
            this.neckWidthFactor = 0.15;
            this.connPoint = null;
            this.tempPoint4 = null;
            this.fixPointCount = 4;
            this.setPoints(points);
        },
        generate: function () {
            var count = this.getPointCount();
            if (count < 2) {
                return;
            }
            if (count == 2) {
                this.paths = this.points;
                return;
            }
            var pnt1 = this.points[0];
            var pnt2 = this.points[1];
            var pnt3 = this.points[2];
            var count = this.getPointCount();
            if (count == 3)
                this.tempPoint4 = this.getTempPoint4(pnt1, pnt2, pnt3);
            else
                this.tempPoint4 = this.points[3];
            if (count == 3 || count == 4)
                this.connPoint = plotUtils.mid(pnt1, pnt2);
            else
                this.connPoint = this.points[4];
            var leftArrowPnts, rightArrowPnts;
            if (plotUtils.isClockWise(pnt1, pnt2, pnt3)) {
                leftArrowPnts = this.getArrowPoints(pnt1, this.connPoint, this.tempPoint4, false);
                rightArrowPnts = this.getArrowPoints(this.connPoint, pnt2, pnt3, true);
            } else {
                leftArrowPnts = this.getArrowPoints(pnt2, this.connPoint, pnt3, false);
                rightArrowPnts = this.getArrowPoints(this.connPoint, pnt1, this.tempPoint4, true);
            }
            var m = leftArrowPnts.length;
            var t = (m - 5) / 2;

            var llBodyPnts = leftArrowPnts.slice(0, t);
            var lArrowPnts = leftArrowPnts.slice(t, t + 5);
            var lrBodyPnts = leftArrowPnts.slice(t + 5, m);

            var rlBodyPnts = rightArrowPnts.slice(0, t);
            var rArrowPnts = rightArrowPnts.slice(t, t + 5);
            var rrBodyPnts = rightArrowPnts.slice(t + 5, m);

            rlBodyPnts = plotUtils.getBezierPoints(rlBodyPnts);
            var bodyPnts = plotUtils.getBezierPoints(rrBodyPnts.concat(llBodyPnts.slice(1)));
            lrBodyPnts = plotUtils.getBezierPoints(lrBodyPnts);

            var pnts = rlBodyPnts.concat(rArrowPnts, bodyPnts, lArrowPnts, lrBodyPnts);
            this.paths = pnts.concat([pnts[0]]);
        },
        finishDrawing: function () {
            if (this.getPointCount() == 3 && this.tempPoint4 != null)
                this.points.push(this.tempPoint4);
            if (this.connPoint != null)
                this.points.push(this.connPoint);
        },
        getArrowPoints: function (pnt1, pnt2, pnt3, clockWise) {
            var midPnt = plotUtils.mid(pnt1, pnt2);
            var len = plotUtils.distance(midPnt, pnt3);
            var midPnt1 = plotUtils.getThirdPoint(pnt3, midPnt, 0, len * 0.3, true);
            var midPnt2 = plotUtils.getThirdPoint(pnt3, midPnt, 0, len * 0.5, true);
            //var midPnt3=PlotUtils.getThirdPoint(pnt3, midPnt, 0, len * 0.7, true);
            midPnt1 = plotUtils.getThirdPoint(midPnt, midPnt1, constants.HALF_PI, len / 5, clockWise);
            midPnt2 = plotUtils.getThirdPoint(midPnt, midPnt2, constants.HALF_PI, len / 4, clockWise);
            //midPnt3=PlotUtils.getThirdPoint(midPnt, midPnt3, Constants.HALF_PI, len / 5, clockWise);

            var points = [midPnt, midPnt1, midPnt2, pnt3];
            // 计算箭头部分
            var arrowPnts = this.getArrowHeadPoints(points, this.headHeightFactor, this.headWidthFactor, this.neckHeightFactor, this.neckWidthFactor);
            var neckLeftPoint = arrowPnts[0];
            var neckRightPoint = arrowPnts[4];
            // 计算箭身部分
            var tailWidthFactor = plotUtils.distance(pnt1, pnt2) / plotUtils.getBaseLength(points) / 2;
            var bodyPnts = this.getArrowBodyPoints(points, neckLeftPoint, neckRightPoint, tailWidthFactor);
            var n = bodyPnts.length;
            var lPoints = bodyPnts.slice(0, n / 2);
            var rPoints = bodyPnts.slice(n / 2, n);
            lPoints.push(neckLeftPoint);
            rPoints.push(neckRightPoint);
            lPoints = lPoints.reverse();
            lPoints.push(pnt2);
            rPoints = rPoints.reverse();
            rPoints.push(pnt1);
            return lPoints.reverse().concat(arrowPnts, rPoints);
        },
        getArrowHeadPoints: function (points, tailLeft, tailRight) {
            var len = plotUtils.getBaseLength(points);
            var headHeight = len * this.headHeightFactor;
            var headPnt = points[points.length - 1];
            var tailWidth = plotUtils.distance(tailLeft, tailRight);
            var headWidth = headHeight * this.headWidthFactor;
            var neckWidth = headHeight * this.neckWidthFactor;
            var neckHeight = headHeight * this.neckHeightFactor;
            var headEndPnt = plotUtils.getThirdPoint(points[points.length - 2], headPnt, 0, headHeight, true);
            var neckEndPnt = plotUtils.getThirdPoint(points[points.length - 2], headPnt, 0, neckHeight, true);
            var headLeft = plotUtils.getThirdPoint(headPnt, headEndPnt, constants.HALF_PI, headWidth, false);
            var headRight = plotUtils.getThirdPoint(headPnt, headEndPnt, constants.HALF_PI, headWidth, true);
            var neckLeft = plotUtils.getThirdPoint(headPnt, neckEndPnt, constants.HALF_PI, neckWidth, false);
            var neckRight = plotUtils.getThirdPoint(headPnt, neckEndPnt, constants.HALF_PI, neckWidth, true);
            return [neckLeft, headLeft, headPnt, headRight, neckRight];
        },
        getArrowBodyPoints: function (points, neckLeft, neckRight, tailWidthFactor) {
            var allLen = plotUtils.wholeDistance(points);
            var len = plotUtils.getBaseLength(points);
            var tailWidth = len * tailWidthFactor;
            var neckWidth = plotUtils.distance(neckLeft, neckRight);
            var widthDif = (tailWidth - neckWidth) / 2;
            var tempLen = 0, leftBodyPnts = [], rightBodyPnts = [];
            for (var i = 1; i < points.length - 1; i++) {
                var angle = plotUtils.getAngleOfThreePoints(points[i - 1], points[i], points[i + 1]) / 2;
                tempLen += plotUtils.distance(points[i - 1], points[i]);
                var w = (tailWidth / 2 - tempLen / allLen * widthDif) / Math.sin(angle);
                var left = plotUtils.getThirdPoint(points[i - 1], points[i], Math.PI - angle, w, true);
                var right = plotUtils.getThirdPoint(points[i - 1], points[i], angle, w, false);
                leftBodyPnts.push(left);
                rightBodyPnts.push(right);
            }
            return leftBodyPnts.concat(rightBodyPnts);
        },
        getTempPoint4: function (linePnt1, linePnt2, point) {
            var midPnt = plotUtils.mid(linePnt1, linePnt2);
            var len = plotUtils.distance(midPnt, point);
            var angle = plotUtils.getAngleOfThreePoints(linePnt1, midPnt, point);
            var symPnt, distance1, distance2, mid;
            if (angle < constants.HALF_PI) {
                distance1 = len * Math.sin(angle);
                distance2 = len * Math.cos(angle);
                mid = plotUtils.getThirdPoint(linePnt1, midPnt, constants.HALF_PI, distance1, false);
                symPnt = plotUtils.getThirdPoint(midPnt, mid, constants.HALF_PI, distance2, true);
            }
            else if (angle >= constants.HALF_PI && angle < Math.PI) {
                distance1 = len * Math.sin(Math.PI - angle);
                distance2 = len * Math.cos(Math.PI - angle);
                mid = plotUtils.getThirdPoint(linePnt1, midPnt, constants.HALF_PI, distance1, false);
                symPnt = plotUtils.getThirdPoint(midPnt, mid, constants.HALF_PI, distance2, false);
            }
            else if (angle >= Math.PI && angle < Math.PI * 1.5) {
                distance1 = len * Math.sin(angle - Math.PI);
                distance2 = len * Math.cos(angle - Math.PI);
                mid = plotUtils.getThirdPoint(linePnt1, midPnt, constants.HALF_PI, distance1, true);
                symPnt = plotUtils.getThirdPoint(midPnt, mid, constants.HALF_PI, distance2, true);
            }
            else {
                distance1 = len * Math.sin(Math.PI * 2 - angle);
                distance2 = len * Math.cos(Math.PI * 2 - angle);
                mid = plotUtils.getThirdPoint(linePnt1, midPnt, constants.HALF_PI, distance1, true);
                symPnt = plotUtils.getThirdPoint(midPnt, mid, constants.HALF_PI, distance2, false);
            }
            return symPnt;
        }
    });
});