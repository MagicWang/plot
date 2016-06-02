var profile = (function () {
    return {
        basePath: "./src",
        releaseDir: "../build",
        releaseName: "",
        action: "release",
        layerOptimize: "closure",
        optimize: "closure",
        cssOptimize: "comments",
        mini: true,
        stripConsole: "warn",
        selectorEngine: "lite",
        packages: [{
                name: "plot",
                location: "plot"
            }],
        layers: {
            "plot/plot": {
                include: ["plot/PlotDraw", "plot/PlotEdit", "plot/dijit/PlotToolbar"]
            }
        }
    };
})();