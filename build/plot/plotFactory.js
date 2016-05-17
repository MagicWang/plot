define([
    "./plotTypes",
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
], function (plotTypes, Arc, AssaultDirection, AttackArrow, Circle, ClosedCurve, Curve, DoubleArrow, Ellipse, FineArrow, FreehandLine, FreehandPolygon, GatheringPlace, Lune, Marker, Polygon, Polyline, Rectangle, Sector, SquadCombat, StraightArrow, TailedAttackArrow, TailedSquadCombat) {
    var factory = {};
    factory.createPlot = function (type, points) {
        switch (type) {
            case plotTypes.ARC:
                return new Arc(points);
            case plotTypes.ELLIPSE:
                return new Ellipse(points);
            case plotTypes.CURVE:
                return new Curve(points);
            case plotTypes.CLOSED_CURVE:
                return new ClosedCurve(points);
            case plotTypes.LUNE:
                return new Lune(points);
            case plotTypes.SECTOR:
                return new Sector(points);
            case plotTypes.GATHERING_PLACE:
                return new GatheringPlace(points);
            case plotTypes.STRAIGHT_ARROW:
                return new StraightArrow(points);
            case plotTypes.ASSAULT_DIRECTION:
                return new AssaultDirection(points);
            case plotTypes.ATTACK_ARROW:
                return new AttackArrow(points);
            case plotTypes.FINE_ARROW:
                return new FineArrow(points);
            case plotTypes.CIRCLE:
                return new Circle(points);
            case plotTypes.DOUBLE_ARROW:
                return new DoubleArrow(points);
            case plotTypes.TAILED_ATTACK_ARROW:
                return new TailedAttackArrow(points);
            case plotTypes.SQUAD_COMBAT:
                return new SquadCombat(points);
            case plotTypes.TAILED_SQUAD_COMBAT:
                return new TailedSquadCombat(points);
            case plotTypes.FREEHAND_LINE:
                return new FreehandLine(points);
            case plotTypes.FREEHAND_POLYGON:
                return new FreehandPolygon(points);
            case plotTypes.POLYGON:
                return new Polygon(points);
            case plotTypes.MARKER:
                return new Marker(points);
            case plotTypes.RECTANGLE:
                return new Rectangle(points);
            case plotTypes.POLYLINE:
                return new Polyline(points);
        }
    };
    return factory;
});