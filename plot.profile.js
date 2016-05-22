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
        defaultConfig: {
            hasCache: {
                "dojo-built": 1,
                "dojo-loader": 1,
                "dom": 1,
                "host-browser": 1,
                "config-selectorEngine": "lite"
            },
            async: 1
        },
        packages: [{
                name: "plot",
                location: "plot"
            }],
        layers: {
            "plot/plot": {
                include: ["plot/PlotDraw", "plot/PlotEdit"]
            }
        }
    };
})();