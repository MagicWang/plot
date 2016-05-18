define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/Evented",
    "./constants",
    "./plotUtils",
    "esri/layers/GraphicsLayer",
    "esri/graphic",
    "esri/Color",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
    "./geometry/Arc",
    "./geometry/AssaultDirection",
    "./geometry/AttackArrow",
    "./geometry/Circle",
    "./geometry/ClosedCurve",
    "./geometry/Curve",
    "./geometry/DoubleArrow",
    "./geometry/Ellipse",
    "./geometry/FineArrow",
    "./geometry/FreehandLine",
    "./geometry/FreehandPolygon",
    "./geometry/GatheringPlace",
    "./geometry/Lune",
    "./geometry/Marker",
    "./geometry/Polygon",
    "./geometry/Polyline",
    "./geometry/Rectangle",
    "./geometry/Sector",
    "./geometry/SquadCombat",
    "./geometry/StraightArrow",
    "./geometry/TailedAttackArrow",
    "./geometry/TailedSquadCombat"
], function (declare, lang, Evented, constants, plotUtils, GraphicsLayer, Graphic, Color, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Point, Polyline, Polygon, Arc, AssaultDirection, AttackArrow, Circle, ClosedCurve, Curve, DoubleArrow, Ellipse, FineArrow, FreehandLine, FreehandPolygon, GatheringPlace, Lune, Marker, Polygon, Polyline, Rectangle, Sector, SquadCombat, StraightArrow, TailedAttackArrow, TailedSquadCombat) {
    var PlotDraw = declare([Evented], {
        constructor: function (map) {
            this.points = null;
            this.plot = null;
            this.graphic = null;
            this.plotType = null;
            this.plotParams = null;
            this.drawOverlay = new GraphicsLayer();
            this.markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 8, null, new Color("#000000"));
            this.lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color("#000000"), 2);
            this.fillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, this.lineSymbol, new Color([0, 0, 0, 0.25]));
            this.map = map;
        },
        activate: function (type, params) {
            this.deactivate();
            this.deactivateMapTools();
            this.map_FirstClick = map.on("click", lang.hitch(this, this.mapFirstClickHandler));
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
        isDrawing: this.plotType != null,
        mapFirstClickHandler: function (e) {
            this.points.push([e.mapPoint.x, e.mapPoint.y]);
            this.plot = this.createPlot(this.plotType, this.points, this.plotParams);
            this.graphic = new Graphic();
            this.graphic.setSymbol(this.generateSymbol());
            this.drawOverlay.add(this.graphic);
            this.map_FirstClick.remove();
            //
            if (this.plot.fixPointCount == this.plot.getPointCount()) {
                this.mapDoubleClickHandler(e);
                return;
            }
            //
            this.map_NextClick = this.map.on("click", lang.hitch(this, this.mapNextClickHandler));
            if (!this.plot.freehand) {
                this.map_DoubleClick = this.map.on("dbl-click", lang.hitch(this, this.mapDoubleClickHandler));
            }
            this.map_MouseMove = this.map.on("mouse-move", lang.hitch(this, this.mapMouseMoveHandler));
        },
        mapMouseMoveHandler: function (e) {
            if (plotUtils.distance([e.mapPoint.x, e.mapPoint.y], this.points[this.points.length - 1]) < constants.ZERO_TOLERANCE)
                return;
            if (!this.plot.freehand) {
                var pnts = this.points.concat([[e.mapPoint.x, e.mapPoint.y]]);
                this.plot.setPoints(pnts);
            } else {
                this.points.push([e.mapPoint.x, e.mapPoint.y]);
                this.plot.setPoints(this.points);
            }
            this.graphic.setGeometry(this.generateGeometry());
        },
        mapNextClickHandler: function (e) {
            if (!this.plot.freehand) {
                if (plotUtils.distance([e.mapPoint.x, e.mapPoint.y], this.points[this.points.length - 1]) < constants.ZERO_TOLERANCE)
                    return;
            }
            this.points.push([e.mapPoint.x, e.mapPoint.y]);
            this.plot.setPoints(this.points);
            if (this.plot.fixPointCount == this.plot.getPointCount()) {
                this.mapDoubleClickHandler(e);
                return;
            }
            if (this.plot && this.plot.freehand) {
                this.mapDoubleClickHandler(e);
            }
            this.graphic.setGeometry(this.generateGeometry());
        },
        mapDoubleClickHandler: function (e) {
            this.disconnectEventHandlers();
            this.plot.finishDrawing();
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
        drawEnd: function () {
            this.drawOverlay.remove(this.graphic);
            this.activateMapTools();
            this.disconnectEventHandlers();
            this.map.removeLayer(this.drawOverlay);
            this.emit("draw-end", this.generateGeometry());
            this.points = [];
            this.plot = null;
            this.plotType = null;
            this.plotParams = null;
            this.graphic = null;
        },
        deactivateMapTools: function () {

        },
        activateMapTools: function () {

        },
        generateGeometry: function () {
            var geometry;
            if (this.plot.geometryType === "point") {
                geometry = new Point(this.plot.x, this.plot.y);
            }
            else if (this.plot.geometryType === "polyline") {
                geometry = new Polyline(this.plot.paths);
            }
            else if (this.plot.geometryType === "polygon") {
                geometry = new Polygon(this.plot.paths);
            }
            geometry.spatialReference = this.map.spatialReference;
            return geometry;
        },
        generateSymbol: function () {
            var symbol;
            if (this.plot.geometryType === "point") {
                symbol = this.markerSymbol;
            }
            else if (this.plot.geometryType === "polyline") {
                symbol = this.lineSymbol;
            }
            else if (this.plot.geometryType === "polygon") {
                symbol = this.fillSymbol;
            }
            return symbol;
        },
        createPlot: function (type, points) {
            switch (type) {
                case PlotDraw.ARC:
                    return new Arc(points);
                case PlotDraw.ELLIPSE:
                    return new Ellipse(points);
                case PlotDraw.CURVE:
                    return new Curve(points);
                case PlotDraw.CLOSED_CURVE:
                    return new ClosedCurve(points);
                case PlotDraw.LUNE:
                    return new Lune(points);
                case PlotDraw.SECTOR:
                    return new Sector(points);
                case PlotDraw.GATHERING_PLACE:
                    return new GatheringPlace(points);
                case PlotDraw.STRAIGHT_ARROW:
                    return new StraightArrow(points);
                case PlotDraw.ASSAULT_DIRECTION:
                    return new AssaultDirection(points);
                case PlotDraw.ATTACK_ARROW:
                    return new AttackArrow(points);
                case PlotDraw.FINE_ARROW:
                    return new FineArrow(points);
                case PlotDraw.CIRCLE:
                    return new Circle(points);
                case PlotDraw.DOUBLE_ARROW:
                    return new DoubleArrow(points);
                case PlotDraw.TAILED_ATTACK_ARROW:
                    return new TailedAttackArrow(points);
                case PlotDraw.SQUAD_COMBAT:
                    return new SquadCombat(points);
                case PlotDraw.TAILED_SQUAD_COMBAT:
                    return new TailedSquadCombat(points);
                case PlotDraw.FREEHAND_LINE:
                    return new FreehandLine(points);
                case PlotDraw.FREEHAND_POLYGON:
                    return new FreehandPolygon(points);
                case PlotDraw.POLYGON:
                    return new Polygon(points);
                case PlotDraw.MARKER:
                    return new Marker(points);
                case PlotDraw.RECTANGLE:
                    return new Rectangle(points);
                case PlotDraw.POLYLINE:
                    return new Polyline(points);
            }
        }
    });
    var constants = {
        ARC: "arc",
        ELLIPSE: "ellipse",
        CURVE: "curve",
        CLOSED_CURVE: "closedcurve",
        LUNE: "lune",
        SECTOR: "sector",
        GATHERING_PLACE: "gatheringplace",
        STRAIGHT_ARROW: "straightarrow",
        ASSAULT_DIRECTION: "assaultdirection",
        ATTACK_ARROW: "attackarrow",
        TAILED_ATTACK_ARROW: "tailedattackarrow",
        SQUAD_COMBAT: "squadcombat",
        TAILED_SQUAD_COMBAT: "tailedsquadcombat",
        FINE_ARROW: "finearrow",
        CIRCLE: "circle",
        DOUBLE_ARROW: "doublearrow",
        POLYLINE: "polyline",
        FREEHAND_LINE: "freehandline",
        POLYGON: "polygon",
        FREEHAND_POLYGON: "freehandpolygon",
        RECTANGLE: "rectangle",
        MARKER: "marker",
        TRIANGLE: "triangle"
    };
    lang.mixin(PlotDraw, constants);
    return PlotDraw;
});
