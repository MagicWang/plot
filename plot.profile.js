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
        plugins: {
            "xstyle/css": "xstyle/build/amd-css"
        },
        packages: [{
                name: "plot",
                location: "plot"
            }],
        layers: {
            "plot/plot": {
                include: ["plot/PlotDraw", "plot/PlotEdit", "plot/dijit/PlotToolbar"],
                targetStylesheet: "plot/plot.css"
            }
        },
        prefixes: [
            ["dojo", "../dojo"],
            ["xstyle", "../xstyle"]
        ]
    };
})();