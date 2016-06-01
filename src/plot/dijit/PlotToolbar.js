define([
    "dojo/Evented",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/has", // feature detection
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/on",
    "dojo/Deferred",  
    "dojo/text!plot/dijit/templates/PlotToolbar.html", // template html
    "dojo/dom-class",
    "dojo/dom-style"
],
function (
    Evented,
    declare,
    lang,
    has,
    _WidgetBase, _TemplatedMixin,
    on,
    Deferred,
    dijitTemplate,
    domClass, domStyle
) {
    var Widget = declare([_WidgetBase, _TemplatedMixin, Evented], {
        
        // template HTML
        templateString: dijitTemplate,
        
        // default options
        options: {
            theme: "PlotToolbar",
            visible: true
        },
        
        // lifecycle: 1
        constructor: function (options, srcRefNode) {
            // mix in settings and defaults
            var defaults = lang.mixin({}, this.options, options);
            // widget node
            this.domNode = srcRefNode;
            // properties
            this.set("theme", defaults.theme);
            this.set("visible", defaults.visible);
            // listeners
            this.watch("theme", this._updateThemeWatch);
            this.watch("visible", this._visible);
        },
        // bind listener for button to action
        postCreate: function () {
            this.inherited(arguments);
        },
        // start widget. called by user
        startup: function () {
            this._init();
        },
        // connections/subscriptions will be cleaned up during the destroy() lifecycle phase
        destroy: function () {
            this.inherited(arguments);
        },
        /* ---------------- */
        /* Public Events */
        /* ---------------- */
        // load
        // click
        /* ---------------- */
        /* Public Functions */
        /* ---------------- */
        // show widget
        show: function () {
            this.set("visible", true);
        },
        // hide widget
        hide: function () {
            this.set("visible", false);
        },
        /* ---------------- */
        /* Private Functions */
        /* ---------------- */
        _init: function () {
            // show or hide widget
            this._visible();
            // widget is now loaded
            this.set("loaded", true);
            this.emit("load", {});
        },
        // theme changed
        _updateThemeWatch: function (attr, oldVal, newVal) {
            domClass.remove(this.domNode, oldVal);
            domClass.add(this.domNode, newVal);
        },
        // show or hide widget
        _visible: function () {
            if (this.get("visible")) {
                domStyle.set(this.domNode, 'display', 'block');
            }
            else {
                domStyle.set(this.domNode, 'display', 'none');
            }
        }
    });
    return Widget;
});