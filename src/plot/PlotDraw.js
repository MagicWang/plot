define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/Evented",
    "./constants",
    "./plotUtils",
    "esri/graphic",
    "esri/Color",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
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
], function (declare, lang, Evented, constants, plotUtils, Graphic, Color, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Arc, AssaultDirection, AttackArrow, Circle, ClosedCurve, Curve, DoubleArrow, Ellipse, FineArrow, FreehandLine, FreehandPolygon, GatheringPlace, Lune, Marker, PlotPolygon, PlotPolyline, Rectangle, Sector, SquadCombat, StraightArrow, TailedAttackArrow, TailedSquadCombat) {
    var PlotDraw = declare([Evented], {
        constructor: function (map) {
            this.markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 8, null, new Color("#000000"));
            this.lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color("#000000"), 2);
            this.fillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, this.lineSymbol, new Color([0, 0, 0, 0.25]));
            this._firstClickHandler = lang.hitch(this, this._firstClickHandler);
            this._nextClickHandler = lang.hitch(this, this._nextClickHandler);
            this._doubleClickHandler = lang.hitch(this, this._doubleClickHandler);
            this._mouseMoveHandler = lang.hitch(this, this._mouseMoveHandler);
            this._points = null;
            this._plot = null;
            this._graphic = null;
            this._plotType = null;
            this._plotParams = null;
            this._map = map;
        },
        activate: function (type, params) {
            this.deactivate();
            this._map.disableDoubleClickZoom();
            this._firstClick_Connect = this._map.on("click", this._firstClickHandler);
            this._plotType = type;
            this._plotParams = params;
        },
        deactivate: function () {
            if (this._firstClick_Connect)
                this._firstClick_Connect.remove();
            if (this._nextClick_Connect)
                this._nextClick_Connect.remove();
            if (this._doubleClick_Connect)
                this._doubleClick_Connect.remove();
            if (this._mouseMove_Connect)
                this._mouseMove_Connect.remove();
            this._map.enableDoubleClickZoom();
            this._map.graphics.remove(this._graphic);
            this._points = [];
            this._plot = null;
            this._graphic = null;
            this._plotType = null;
            this._plotParams = null;
        },
        isDrawing: this._plotType != null,
        _firstClickHandler: function (e) {
            this._firstClick_Connect.remove();
            this._points.push([e.mapPoint.x, e.mapPoint.y]);
            this._plot = PlotDraw.createPlot(this._plotType, this._points, this._map.spatialReference.wkid);
            this._graphic = new Graphic();
            this._graphic.setSymbol(this._generateSymbol(this._plot));
            this._map.graphics.add(this._graphic);
            //
            if (this._plot.fixPointCount == this._plot.getPointCount()) {
                this._doubleClickHandler(e);
                return;
            }
            //
            this._nextClick_Connect = this._map.on("click", this._nextClickHandler);
            if (!this._plot.freehand) {
                this._doubleClick_Connect = this._map.on("dbl-click", this._doubleClickHandler);
            }
            this._mouseMove_Connect = this._map.on("mouse-move", this._mouseMoveHandler);
        },
        _nextClickHandler: function (e) {
            if (!this._plot.freehand) {
                if (plotUtils.distance([e.mapPoint.x, e.mapPoint.y], this._points[this._points.length - 1]) < constants.ZERO_TOLERANCE)
                    return;
            }
            this._points.push([e.mapPoint.x, e.mapPoint.y]);
            this._plot.setPoints(this._points);
            if (this._plot.fixPointCount == this._plot.getPointCount()) {
                this._doubleClickHandler(e);
                return;
            }
            if (this._plot && this._plot.freehand) {
                this._doubleClickHandler(e);
            }
            this._graphic.setGeometry(this._plot.toGeometry());
        },
        _doubleClickHandler: function (e) {
            this.emit("draw-end", { geometry: this._plot.toGeometry(), plot: this._plot });
            this.deactivate();
        },
        _mouseMoveHandler: function (e) {
            if (plotUtils.distance([e.mapPoint.x, e.mapPoint.y], this._points[this._points.length - 1]) < constants.ZERO_TOLERANCE)
                return;
            if (!this._plot.freehand) {
                var pnts = this._points.concat([[e.mapPoint.x, e.mapPoint.y]]);
                this._plot.setPoints(pnts);
            } else {
                this._points.push([e.mapPoint.x, e.mapPoint.y]);
                this._plot.setPoints(this._points);
            }
            this._graphic.setGeometry(this._plot.toGeometry());
        },
        _generateSymbol: function (plot) {
            var symbol;
            if (plot.type === "point") {
                symbol = this.markerSymbol;
            }
            else if (plot.type === "polyline") {
                symbol = this.lineSymbol;
            }
            else if (plot.type === "polygon") {
                symbol = this.fillSymbol;
            }
            return symbol;
        }
    });
    PlotDraw.createPlot = function (type, points, wkid) {
        switch (type) {
            case PlotDraw.ARC:
                return new Arc(points, wkid);
            case PlotDraw.ELLIPSE:
                return new Ellipse(points, wkid);
            case PlotDraw.CURVE:
                return new Curve(points, wkid);
            case PlotDraw.CLOSED_CURVE:
                return new ClosedCurve(points, wkid);
            case PlotDraw.LUNE:
                return new Lune(points, wkid);
            case PlotDraw.SECTOR:
                return new Sector(points, wkid);
            case PlotDraw.GATHERING_PLACE:
                return new GatheringPlace(points, wkid);
            case PlotDraw.STRAIGHT_ARROW:
                return new StraightArrow(points, wkid);
            case PlotDraw.ASSAULT_DIRECTION:
                return new AssaultDirection(points, wkid);
            case PlotDraw.ATTACK_ARROW:
                return new AttackArrow(points, wkid);
            case PlotDraw.FINE_ARROW:
                return new FineArrow(points, wkid);
            case PlotDraw.CIRCLE:
                return new Circle(points, wkid);
            case PlotDraw.DOUBLE_ARROW:
                return new DoubleArrow(points, wkid);
            case PlotDraw.TAILED_ATTACK_ARROW:
                return new TailedAttackArrow(points, wkid);
            case PlotDraw.SQUAD_COMBAT:
                return new SquadCombat(points, wkid);
            case PlotDraw.TAILED_SQUAD_COMBAT:
                return new TailedSquadCombat(points, wkid);
            case PlotDraw.FREEHAND_LINE:
                return new FreehandLine(points, wkid);
            case PlotDraw.FREEHAND_POLYGON:
                return new FreehandPolygon(points, wkid);
            case PlotDraw.POLYGON:
                return new PlotPolygon(points, wkid);
            case PlotDraw.MARKER:
                return new Marker(points, wkid);
            case PlotDraw.RECTANGLE:
                return new Rectangle(points, wkid);
            case PlotDraw.POLYLINE:
                return new PlotPolyline(points, wkid);
        }
    };
    var plotTypes = {
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
    lang.mixin(PlotDraw, plotTypes);
    return PlotDraw;
});
