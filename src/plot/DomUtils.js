define(function () {
    var util = {};

    util.create = function (tagName, className, parent, id) {
        var element = document.createElement(tagName);
        element.className = className || '';
        if (id) {
            element.id = id;
        }
        if (parent) {
            parent.appendChild(element);
        }
        return element;
    };

    util.createHidden = function (tagName, parent, id) {
        var element = document.createElement(tagName);
        element.style.display = 'none';
        if (id) {
            element.id = id;
        }
        if (parent) {
            parent.appendChild(element);
        }
        return element;
    };

    util.remove = function (element, parent) {
        if (parent && element) {
            parent.removeChild(element);
        }
    };

    util.get = function (id) {
        return document.getElementById(id);
    };

    util.getStyle = function (element, name) {
        var value = element.style[name];
        return value === 'auto' ? null : value;
    };

    util.hasClass = function (element, name) {
        return (element.className.length > 0) &&
            new RegExp('(^|\\s)' + name + '(\\s|$)').test(element.className);
    };

    util.addClass = function (element, name) {
        if (this.hasClass(element, name)) {
            return;
        }
        if (element.className) {
            element.className += ' ';
        }
        element.className += name;
    };

    util.removeClass = function (element, name) {
        element.className = P.Utils.trim((' ' + element.className + ' ').replace(' ' + name + ' ', ' '));
    };

    util.getDomEventKey = function (type, fn, context) {
        return '_p_dom_event_' + type + '_' + P.Utils.stamp(fn) + (context ? '_' + P.Utils.stamp(context) : '');
    };

    util.addListener = function (element, type, fn, context) {
        var self = this,
            eventKey = util.getDomEventKey(type, fn, context),
            handler = element[eventKey];

        if (handler) {
            return self;
        }

        handler = function (e) {
            return fn.call(context || element, e);
        };

        if ('addEventListener' in element) {
            element.addEventListener(type, handler, false);
        } else if ('attachEvent' in element) {
            element.attachEvent('on' + type, handler);
        }

        element[eventKey] = handler;
        return self;
    };

    util.removeListener = function (element, type, fn, context) {
        var self = this,
            eventKey = util.getDomEventKey(type, fn, context),
            handler = element[eventKey];

        if (!handler) {
            return self;
        }

        if ('removeEventListener' in element) {
            element.removeEventListener(type, handler, false);
        } else if ('detachEvent' in element) {
            element.detachEvent('on' + type, handler);
        }

        element[eventKey] = null;

        return self;
    };
    return util;
});