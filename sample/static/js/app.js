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

var map, plotDraw, plotEdit, drawOverlay;
// 初始化地图，底图使用openstreetmap在线地图
require(["esri/map",
    "esri/layers/GraphicsLayer",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
    "plot/event/eventType",
    "plot/PlotDraw",
    "plot/PlotEdit",
    "dojo/domReady!"],
     function (Map, GraphicsLayer, Graphic, Point, Polyline, Polygon, eventType, PlotDraw, PlotEdit) {
         map = new Map("mapDiv", {
             center: [-56.049, 38.485],
             zoom: 3,
             basemap: "streets"
         });

         // 初始化标绘绘制工具，添加绘制结束事件响应
         plotDraw = new PlotDraw(map);
         plotDraw.on(eventType.DRAW_END, onDrawEnd);

         // 初始化标绘编辑工具
         //plotEdit = new PlotEdit(map);

         // 绘制好的标绘符号，添加到FeatureOverlay显示。
         drawOverlay = new GraphicsLayer();
         drawOverlay.on("click", function (e) {
             if (plotDraw.isDrawing)
                 return;
             if (e.graphic) {
                 // 开始编辑
                 //plotEdit.activate(e.graphic);
                 activeDelBtn();
             } else {
                 // 结束编辑
                 //plotEdit.deactivate();
                 deactiveDelBtn();
             }
         });
         map.addLayer(drawOverlay);
         initEvents();
     });
function initEvents() {
    require(["dojo/dom", "plot/plotTypes"], function (dom, plotTypes) {
        dom.byId("btn-delete").onclick = function () {
            //if (drawOverlay && plotEdit && plotEdit.activePlot) {
            //    drawOverlay.remove(plotEdit.activePlot);
            //    plotEdit.deactivate();
            //    deactiveDelBtn();
            //}
        };
        dom.byId("arc").onclick = activate(plotTypes.ARC);
    });
}
// 绘制结束后，添加到FeatureOverlay显示。
function onDrawEnd(graphic) {
    drawOverlay.add(graphic);
    // 开始编辑
    //plotEdit.activate(graphic);
    activeDelBtn();
}

// 指定标绘类型，开始绘制。
function activate(type) {
    //plotEdit.deactivate();
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