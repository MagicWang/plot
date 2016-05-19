define([
    "dojo/_base/declare",
    "../constants",
    "../plotUtils",
    "./Geometry"
], function (declare, constants, plotUtils, Geometry) {
    return declare([Geometry], {
        constructor: function (points) {
            this.geometryType = "polygon";
            this.headHeightFactor = 0.18;
            this.headWidthFactor = 0.3;
            this.neckHeightFactor = 0.85;
            this.neckWidthFactor = 0.15;
            this.headTailFactor = 0.8;
            this.setPoints(points);
        },
        generate: function () {
            if (this.getPointCount() < 2) {
                return;
            }
            if (this.getPointCount() == 2) {
                this.paths = this.points;
                return;
            }
            var pnts = this.getPoints();
            // 计算箭尾
            var tailLeft = pnts[0];
            var tailRight = pnts[1];
            if (plotUtils.isClockWise(pnts[0], pnts[1], pnts[2])) {
                tailLeft = pnts[1];
                tailRight = pnts[0];
            }
            var midTail = plotUtils.mid(tailLeft, tailRight);
            var bonePnts = [midTail].concat(pnts.slice(2));
            // 计算箭头
            var headPnts = this.getArrowHeadPoints(bonePnts, tailLeft, tailRight);
            var neckLeft = headPnts[0];
            var neckRight = headPnts[4];
            var tailWidthFactor = plotUtils.distance(tailLeft, tailRight) / plotUtils.getBaseLength(bonePnts);
            // 计算箭身
            var bodyPnts = this.getArrowBodyPoints(bonePnts, neckLeft, neckRight, tailWidthFactor);
            // 整合
            var count = bodyPnts.length;
            var leftPnts = [tailLeft].concat(bodyPnts.slice(0, count / 2));
            leftPnts.push(neckLeft);
            var rightPnts = [tailRight].concat(bodyPnts.slice(count / 2, count));
            rightPnts.push(neckRight);

            leftPnts = plotUtils.getQBSplinePoints(leftPnts);
            rightPnts = plotUtils.getQBSplinePoints(rightPnts);
            var pList = leftPnts.concat(headPnts, rightPnts.reverse());
            this.paths = pList.concat([pList[0]]);
        },
        getArrowHeadPoints: function (points, tailLeft, tailRight) {
            var len = plotUtils.getBaseLength(points);
            var headHeight = len * this.headHeightFactor;
            var headPnt = points[points.length - 1];
            len = plotUtils.distance(headPnt, points[points.length - 2]);
            var tailWidth = plotUtils.distance(tailLeft, tailRight);
            if (headHeight > tailWidth * this.headTailFactor) {
                headHeight = tailWidth * this.headTailFactor;
            }
            var headWidth = headHeight * this.headWidthFactor;
            var neckWidth = headHeight * this.neckWidthFactor;
            headHeight = headHeight > len ? len : headHeight;
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
        }
    });
});