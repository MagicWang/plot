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
], function (declare, lang, Evented, constants, plotUtils, Graphic, Color, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Point, Polyline, Polygon, Arc, AssaultDirection, AttackArrow, Circle, ClosedCurve, Curve, DoubleArrow, Ellipse, FineArrow, FreehandLine, FreehandPolygon, GatheringPlace, Lune, Marker, PlotPolygon, PlotPolyline, Rectangle, Sector, SquadCombat, StraightArrow, TailedAttackArrow, TailedSquadCombat) {
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
            this._plot = this._createPlot(this._plotType, this._points, this._plotParams);
            this._graphic = new Graphic();
            this._graphic.setSymbol(this._generateSymbol());
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
            this._graphic.setGeometry(this._generateGeometry());
        },
        _doubleClickHandler: function (e) {
            this.emit("draw-end", { geometry: this._generateGeometry(), plot: this._plot });
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
            this._graphic.setGeometry(this._generateGeometry());
        },
        _generateGeometry: function () {
            var geometry;
            if (this._plot.geometryType === "point") {
                geometry = new Point(this._plot.x, this._plot.y);
            }
            else if (this._plot.geometryType === "polyline") {
                geometry = new Polyline(this._plot.paths);
            }
            else if (this._plot.geometryType === "polygon") {
                geometry = new Polygon(this._plot.paths);
            }
            geometry.spatialReference = this._map.spatialReference;
            return geometry;
        },
        _generateSymbol: function () {
            var symbol;
            if (this._plot.geometryType === "point") {
                symbol = this.markerSymbol;
            }
            else if (this._plot.geometryType === "polyline") {
                symbol = this.lineSymbol;
            }
            else if (this._plot.geometryType === "polygon") {
                symbol = this.fillSymbol;
            }
            return symbol;
        },
        _createPlot: function (type, points) {
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
                    return new PlotPolygon(points);
                case PlotDraw.MARKER:
                    return new Marker(points);
                case PlotDraw.RECTANGLE:
                    return new Rectangle(points);
                case PlotDraw.POLYLINE:
                    return new PlotPolyline(points);
            }
        }
    });
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
