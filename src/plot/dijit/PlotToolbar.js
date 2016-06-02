define([
    "dojo/Evented",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/has", // feature detection
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/on",
    "dojo/Deferred",
    "dojo/text!./templates/PlotToolbar.html", // template html
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
            baseClass: "PlotToolbar",
            visible: true
        },

        // lifecycle: 1
        constructor: function (options, srcRefNode) {
            // mix in settings and defaults
            var defaults = lang.mixin({}, this.options, options);
            // widget node
            this.domNode = srcRefNode;
            this.set("baseClass", defaults.baseClass);
            this.set("visible", defaults.visible);
            // listeners
            this.watch("baseClass", this._updateBaseClassWatch);
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
        // baseClass changed
        _updateBaseClassWatch: function (attr, oldVal, newVal) {
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
        },
        _onClick: function (evt) {
            if (evt.target.id === this.baseClass) {
                return;
            }
            var tool = evt.target.id.toLowerCase();
            this.emit("click", tool);
        }
    });
    return Widget;
});