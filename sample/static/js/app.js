
var map, plotDraw, plotEdit, editGraphic, markerSymbol, lineSymbol, fillSymbol;
// 初始化地图，底图使用openstreetmap在线地图
(function () {
    require(["esri/map",
            "esri/Color",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/symbols/SimpleLineSymbol",
            "esri/symbols/SimpleFillSymbol",
            "dojo/domReady!"],
             function (Map, Color, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol) {
                 map = new Map("mapDiv", {
                     center: [-56.049, 38.485],
                     zoom: 3,
                     basemap: "streets"
                 });

                 markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 8, null, new Color("#FF0000"));
                 lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color("#FF0000"), 2);
                 fillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, this.lineSymbol, new Color([255, 0, 0, 0.25]));

                 map.on("load", function () {
                     readFromDB();
                 });
                 initEvents();
             });
})();
function initEvents() {
    require(["dojo/dom", "plot/PlotDraw", "plot/PlotEdit", "plot/dijit/PlotToolbar"], function (dom, PlotDraw, PlotEdit, PlotToolbar) {
        // 初始化标绘绘制工具，添加绘制结束事件响应
        plotDraw = new PlotDraw(map);
        plotDraw.on("draw-end", onDrawEnd);
        // 初始化标绘编辑工具
        plotEdit = new PlotEdit(map);
        plotEdit.on("edit-end", onEditEnd);
        map.on("click", function (e) {
            if (plotDraw.isDrawing)
                return;
            if (e.graphic && e.graphic.plot) {
                // 开始编辑
                editGraphic = e.graphic;
                plotEdit.activate(editGraphic);
            } else {
                // 结束编辑
                editGraphic = null;
                plotEdit.deactivate();
            }
        });

        var toolbar = new PlotToolbar();
        toolbar.startup();
        toolbar.placeAt("mapDiv");
        toolbar.on("click", function (evt) {
            if (!evt)
                return;
            if (evt === "clear") {
                if (plotEdit && editGraphic) {
                    map.graphics.remove(editGraphic);
                    plotEdit.deactivate();
                }
            } else {
                activate(evt);
            }
        });
        toolbar.on("color-change", function (evt) {
            markerSymbol.setColor(evt.color);
            lineSymbol.setColor(evt.color);
            fillSymbol.setColor(evt.color);
            if (plotEdit && editGraphic) {
                editGraphic.symbol.setColor(evt.color);
                editGraphic.draw();
            }
        });
    });
}
// 绘制结束后，添加到GraphicsLayer显示，可能需要保存。
function onDrawEnd(evt) {
    require(["esri/graphic",
        "esri/symbols/jsonUtils",
        "esri/geometry/Point",
        "esri/geometry/Polyline",
        "esri/geometry/Polygon"
    ],
     function (Graphic, jsonUtils, Point, Polyline, Polygon) {
         var symbol;
         if (evt.geometry.isInstanceOf(Point)) {
             symbol = jsonUtils.fromJson(markerSymbol.toJson());
         } else if (evt.geometry.isInstanceOf(Polyline)) {
             symbol = jsonUtils.fromJson(lineSymbol.toJson());
         } else if (evt.geometry.isInstanceOf(Polygon)) {
             symbol = jsonUtils.fromJson(fillSymbol.toJson());
         }
         var graphic = new Graphic(evt.geometry, symbol);
         graphic.plot = evt.plot;
         map.graphics.add(graphic);
         // 开始编辑
         editGraphic = graphic;
         plotEdit.activate(editGraphic);
         saveToDB(graphic);
     });
};
//编辑结束后，可能需要保存。
function onEditEnd(evt) {
    saveToDB(evt.graphic);
};
// 指定标绘类型，开始绘制。
function activate(type) {
    plotEdit.deactivate();
    plotDraw.activate(type);
};

function saveToDB(graphic) {
    require(["plot/plotEncoder"], function (plotEncoder) {
        var s = JSON.stringify(plotEncoder.toJson(graphic));
    });
}
function readFromDB() {
    require(["plot/plotDecoder", "dojo/text!http://localhost:9000/test.json"], function (plotDecoder, json) {
        var graphic = plotDecoder.fromJson(JSON.parse(json));
        map.graphics.add(graphic);
    });
}