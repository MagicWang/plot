define([
    "dojo/Evented",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dnd/move",
    "dijit/_WidgetBase",
    "dijit/a11yclick", // Custom press, release, and click synthetic events which trigger on a left mouse click, touch, or space/enter keyup.
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/on",
    "dojo/text!./templates/PlotToolbar.html", // template html
    "dojo/dom-class",
    "dojo/dom-style",
    "esri/dijit/ColorPicker"
],
function (
    Evented,
    declare,
    lang,
    move,
    _WidgetBase, a11yclick, _TemplatedMixin, _WidgetsInTemplateMixin,
    on,
    dijitTemplate,
    domClass, domStyle, ColorPicker
) {
    var Widget = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {

        // template HTML
        templateString: dijitTemplate,

        // default options
        options: {
            baseClass: "PlotToolbar",
            visible: true
        },
        //parse ColorPicker
        widgetsInTemplate: true,
        // lifecycle: 1
        constructor: function (options, srcRefNode) {
            // mix in settings and defaults
            var defaults = lang.mixin({}, this.options, options);
            // widget node
            this.domNode = srcRefNode;
            this.set("baseClass", defaults.baseClass);
            this.set("visible", defaults.visible);
            // listeners
            this.watch("baseClass", this._baseClassWatch);
            this.watch("visible", this._visibleWatch);
        },
        // bind listener for button to action
        postCreate: function () {
            this.inherited(arguments);
            if (this.domNode) {
                var dnd = new move.parentConstrainedMoveable(this.domNode, { within: true });
            }
            this.own(on(this.ulNode, a11yclick, lang.hitch(this, this._onClick)));
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
        // color-change
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
            this._visibleWatch();
            // widget is now loaded
            this.set("loaded", true);
            this.emit("load", {});
            this.colorPicker.on("color-change", lang.hitch(this, this._colorChange));
        },
        // baseClass changed
        _baseClassWatch: function (attr, oldVal, newVal) {
            domClass.remove(this.domNode, oldVal);
            domClass.add(this.domNode, newVal);
        },
        // show or hide widget
        _visibleWatch: function () {
            if (this.get("visible")) {
                domStyle.set(this.domNode, 'display', 'block');
            }
            else {
                domStyle.set(this.domNode, 'display', 'none');
            }
        },
        _colorChange: function () {
            this.emit("color-change", { color: this.colorPicker.color });
        },
        _onClick: function () {
            if (arguments && arguments.length > 0 && arguments[0].target.className !== this.baseClass) {
                var id = arguments[0].target.className;
                if (id === "color") {
                    if (domStyle.get(this.colorPicker.domNode, "display") === "none") {
                        domStyle.set(this.colorPicker.domNode, 'display', 'block');
                    } else {
                        domStyle.set(this.colorPicker.domNode, 'display', 'none');
                    }
                } else {
                    this.emit("click", id);
                }
            }
        }
    });
    return Widget;
});