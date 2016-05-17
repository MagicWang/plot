define([
    "dojo/_base/declare",
    "./constants",
    "./plotTypes",
    "./plotUtils",
    "./plotFactory",
    "./event/eventType",
    "./event/PlotDrawEvent",
    "esri/layers/GraphicsLayer",
    "esri/graphic"
], function (declare, constants, plotTypes, plotUtils, plotFactory, eventType, PlotDrawEvent, GraphicsLayer, Graphic) {
    return declare(null, {
        constructor: function (map) {
            this.points = null;
            this.plot = null;
            this.graphic = null;
            this.plotType = null;
            this.plotParams = null;
            this.drawOverlay = new GraphicsLayer();
            this.setMap(map);
        },
        activate: function (type, params) {
            this.deactivate();
            this.deactivateMapTools();
            this.map_FirstClick = map.on("click", this.mapFirstClickHandler);
            this.plotType = type;
            this.plotParams = params;
            this.map.addLayer(this.drawOverlay);
        },
        deactivate: function () {
            this.disconnectEventHandlers();
            this.map.removeLayer(this.drawOverlay);
            this.drawOverlay.clear();
            this.points = [];
            this.plot = null;
            this.graphic = null;
            this.plotType = null;
            this.plotParams = null;
            this.activateMapTools();
        },
        isDrawing: function () {
            return this.plotType != null;
        },
        setMap: function (value) {
            this.map = value;
        },
        mapFirstClickHandler: function (e) {
            this.points.push(e.mapPoint);
            this.plot = plotFactory.createPlot(this.plotType, this.points, this.plotParams);
            this.graphic = new Graphic(this.plot);
            this.drawOverlay.add(this.graphic);
            this.map_FirstClick.remove()
            //
            if (this.plot.fixPointCount == this.plot.getPointCount()) {
                this.mapDoubleClickHandler(e);
                return;
            }
            //
            this.map_NextClick = this.map.on("click", this.mapNextClickHandler);
            if (!this.plot.freehand) {
                this.map_DoubleClick = this.map.on("dbl-click", this.mapDoubleClickHandler);
            }
            this.map_MouseMove = this.map.on("mouse-move", this.mapMouseMoveHandler);
        },
        mapMouseMoveHandler: function (e) {
            if (plotUtils.distance(e.mapPoint, this.points[this.points.length - 1]) < constants.ZERO_TOLERANCE)
                return;
            if (!this.plot.freehand) {
                var pnts = this.points.concat([e.mapPoint]);
                this.plot.setPoints(pnts);
            } else {
                this.points.push(e.mapPoint);
                this.plot.setPoints(this.points);
            }
        },
        mapNextClickHandler: function (e) {
            if (!this.plot.freehand) {
                if (plotUtils.distance(e.mapPoint, this.points[this.points.length - 1]) < constants.ZERO_TOLERANCE)
                    return;
            }
            this.points.push(e.mapPoint);
            this.plot.setPoints(this.points);
            if (this.plot.fixPointCount == this.plot.getPointCount()) {
                this.mapDoubleClickHandler(e);
                return;
            }
            if (this.plot && this.plot.freehand) {
                this.mapDoubleClickHandler(e);
            }
        },
        mapDoubleClickHandler: function (e) {
            this.disconnectEventHandlers();
            this.plot.finishDrawing();
            e.preventDefault();
            this.drawEnd();
        },
        disconnectEventHandlers: function () {
            if (this.map_FirstClick)
                this.map_FirstClick.remove();
            if (this.map_NextClick)
                this.map_NextClick.remove();
            if (this.map_DoubleClick)
                this.map_DoubleClick.remove();
            if (this.map_MouseMove)
                this.map_MouseMove.remove();
        },
        drawEnd: function (feature) {
            this.drawOverlay.remove(this.graphic);
            this.activateMapTools();
            this.disconnectEventHandlers();
            this.map.removeLayer(this.drawOverlay);
            this.points = [];
            this.plot = null;
            this.plotType = null;
            this.plotParams = null;
            //this.dispatchEvent(new PlotDrawEvent(eventType.DRAW_END, this.graphic));
            this.graphic = null;
        },
        deactivateMapTools: function () {

        },
        activateMapTools: function () {

        }
    });
});
