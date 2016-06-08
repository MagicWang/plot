//>>built
define("plot/dijit/PlotToolbar","dojo/Evented dojo/_base/declare dojo/_base/lang dojo/dnd/move dijit/_WidgetBase dijit/a11yclick dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/on dojo/text!./templates/PlotToolbar.html dojo/dom-class dojo/dom-style esri/dijit/ColorPicker".split(" "),function(e,f,a,g,h,k,l,m,n,p,d,b,r){return f([h,l,m,e],{templateString:p,options:{baseClass:"PlotToolbar",visible:!0},widgetsInTemplate:!0,constructor:function(b,q){var c=a.mixin({},this.options,b);this.domNode=
q;this.set("baseClass",c.baseClass);this.set("visible",c.visible);this.watch("baseClass",this._baseClassWatch);this.watch("visible",this._visibleWatch)},postCreate:function(){this.inherited(arguments);this.domNode&&new g.parentConstrainedMoveable(this.domNode,{within:!0});this.own(n(this.ulNode,k,a.hitch(this,this._onClick)))},startup:function(){this._init()},destroy:function(){this.inherited(arguments)},show:function(){this.set("visible",!0)},hide:function(){this.set("visible",!1)},_init:function(){this._visibleWatch();
this.set("loaded",!0);this.emit("load",{});this.colorPicker.on("color-change",a.hitch(this,this._colorChange))},_baseClassWatch:function(b,a,c){d.remove(this.domNode,a);d.add(this.domNode,c)},_visibleWatch:function(){this.get("visible")?b.set(this.domNode,"display","block"):b.set(this.domNode,"display","none")},_colorChange:function(){this.emit("color-change",{color:this.colorPicker.color})},_onClick:function(){if(arguments&&0<arguments.length&&arguments[0].target.className!==this.baseClass){var a=
arguments[0].target.className;"color"===a?"none"===b.get(this.colorPicker.domNode,"display")?b.set(this.colorPicker.domNode,"display","block"):b.set(this.colorPicker.domNode,"display","none"):this.emit("click",a)}}})});
//# sourceMappingURL=PlotToolbar.js.map