/**
 * 动态标绘API plot4ol3，基于OpenLayer3开发，旨在为基于开源GIS技术做项目开发提供标绘API。
 * 当前版本1.0，提供的功能：绘制基本标绘符号。
 * 绘制接口: PlotDraw
 * 编辑接口: PlotEdit
 * 具体用法请参考演示系统源码。
 *
 * 开发者：@平凡的世界
 * QQ号：21587252
 * 邮箱：gispace@yeah.net
 * 博客：http://blog.csdn.net/gispace
 * 动态标绘交流QQ群：318659439
 *
 * 如果想要收到API更新消息，请开源项目页面评论中留下联系方式 http://git.oschina.net/ilocation/plot
 *
 * */

var map, plotDraw, plotEdit, editGraphic, markerSymbol, lineSymbol, fillSymbol;
// 初始化地图，底图使用openstreetmap在线地图
require(["esri/map",
    "esri/layers/GraphicsLayer",
    "esri/graphic",
    "esri/Color",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
    "plot/PlotDraw",
    "plot/PlotEdit",
    "dojo/domReady!"],
     function (Map, GraphicsLayer, Graphic, Color, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Point, Polyline, Polygon, PlotDraw, PlotEdit) {
         map = new Map("mapDiv", {
             center: [-56.049, 38.485],
             zoom: 3,
             basemap: "streets"
         });

         markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 8, null, new Color("#FF0000"));
         lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color("#FF0000"), 2);
         fillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, this.lineSymbol, new Color([255, 0, 0, 0.25]));
         // 初始化标绘绘制工具，添加绘制结束事件响应
         plotDraw = new PlotDraw(map);
         plotDraw.on("draw-end", onDrawEnd);
         // 初始化标绘编辑工具
         plotEdit = new PlotEdit(map);
         map.on("click", function (e) {
             if (plotDraw.isDrawing)
                 return;
             if (e.graphic && e.graphic.plot) {
                 // 开始编辑
                 editGraphic = e.graphic;
                 plotEdit.activate(e.graphic);
                 activeDelBtn();
             } else {
                 // 结束编辑
                 editGraphic = null;
                 plotEdit.deactivate();
                 deactiveDelBtn();
             }
         });
         initEvents();
     });
function initEvents() {
    require(["dojo/dom"], function (dom) {
        dom.byId("btn-delete").onclick = function () {
            if (plotEdit && editGraphic) {
                map.graphics.remove(editGraphic);
                plotEdit.deactivate();
                deactiveDelBtn();
            }
        };
        dom.byId("menu").onclick = function (evt) {
            if (evt.target.id === "menu") {
                return;
            }
            var tool = evt.target.id.toLowerCase();
            activate(tool);
        };
    });
}
// 绘制结束后，添加到FeatureOverlay显示。
function onDrawEnd(evt) {
    require(["esri/graphic",
        "esri/geometry/Point",
        "esri/geometry/Polyline",
        "esri/geometry/Polygon",
    ],
     function (Graphic, Point, Polyline, Polygon) {
         var symbol;
         if (evt.geometry.isInstanceOf(Point)) {
             symbol = markerSymbol;
         } else if (evt.geometry.isInstanceOf(Polyline)) {
             symbol = lineSymbol;
         } else if (evt.geometry.isInstanceOf(Polygon)) {
             symbol = fillSymbol;
         }
         var graphic = new Graphic(evt.geometry, symbol);
         graphic.plot = evt.plot;
         map.graphics.add(graphic);
         // 开始编辑
         plotEdit.activate(graphic);
         activeDelBtn();
     });
};

// 指定标绘类型，开始绘制。
function activate(type) {
    plotEdit.deactivate();
    plotDraw.activate(type);
};

function activeDelBtn() {
    require(["dojo/dom"], function (dom) {
        dom.byId("btn-delete").style.display = 'inline-block';
    });
}

function deactiveDelBtn() {
    require(["dojo/dom"], function (dom) {
        dom.byId("btn-delete").style.display = 'none';
    });
}